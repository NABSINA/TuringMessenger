export class GenericResponse {

    message: string;

    constructor(message: string) {
        this.message = message;
    }

    static Ok() {
        return new this('Success');
    }

    static Fail() {
        return new this('Fail');
    }

    static Message(message: string) {
        return new this(message);
    }
}
