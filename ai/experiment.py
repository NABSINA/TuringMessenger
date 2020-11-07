import logging
import flask
from simpletransformers.language_generation import LanguageGenerationModel
from simpletransformers.conv_ai import ConvAIModel, ConvAIArgs

app = flask.Flask(__name__)


logging.basicConfig(level=logging.INFO)
transformers_logger = logging.getLogger("transformers")
transformers_logger.setLevel(logging.WARNING)

#model = LanguageGenerationModel("gpt2", "gpt2", use_cuda=False)

model_args = ConvAIArgs()
model_args.max_history = 5
#model_args.overwrite_output_dir = True
#model_args.reprocess_input_data = True
model_args.num_train_epochs = 50
model_args.save_model_every_epoch = False



model = ConvAIModel(
    "gpt",
    "data/gpt_personachat_cache", # download from https://s3.amazonaws.com/models.huggingface.co/transfer-learning-chatbot/gpt_personachat_cache.tar.gz
    use_cuda=False,
    args=model_args)

model.train_model('data/personachat_self_original.json')

# need to decide whether server or AI handles 
@app.route('/converse')
def converse() -> str:
    return model.interact_single(flask.request.args.get('message', ''), flask.request.args.get('history', []))

app.run()