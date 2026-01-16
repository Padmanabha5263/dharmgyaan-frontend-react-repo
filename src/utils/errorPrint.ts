export const errorPrint = (error: unknown, fileName: string) => {
    const err = {
        message: '',
    }
    if (error instanceof Error) {
        err.message = error.message
    }
    console.error(`${fileName} :: ${err.message}`);
    return err;
}