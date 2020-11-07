import logging
import flask
from simpletransformers.language_generation import LanguageGenerationModel
import socket

import os.path

app = flask.Flask(__name__)


#logging.basicConfig(level=logging.INFO)
#transformers_logger = logging.getLogger("transformers")
#transformers_logger.setLevel(logging.WARNING)

model = LanguageGenerationModel("gpt2", "distilgpt2", use_cuda=False)

#model_args = ConvAIArgs()
#model_args.max_history = 5
#model_args.overwrite_output_dir = True
#model_args.reprocess_input_data = True
#model_args.num_train_epochs = 50
#model_args.save_model_every_epoch = False
#model_args.output_dir = os.path.join('.', 'cache_dir')
#model_args.use_multiprocessing = False
#model_args.multiprocessing_chunksize = 10

# need to decide whether server or AI handles 
@app.route('/converse/<message>')
def converse(message: str) -> str:
    res = None
    while not res:
        res = model.generate(message)[0].strip('|<endoftext>|').replace('"', '')
        res = res[len(message):#max(res.rfind('.'), res.rfind('?'), res.rfind('!'))
        ].strip()
    return res

app.run(host=socket.gethostbyname(socket.gethostname()), port=8181)