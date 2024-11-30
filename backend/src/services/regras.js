function NumberWhats(whatsapp) {
  if (isNaN(whatsapp)) {
    throw { status: 400, message: "O campo whatsapp deve ser um número" };
  }
}

function CheckEmail(emailexist) {
  if (emailexist) {
    throw { status: 400, message: "Email ja cadastrado" };
  }
}

module.exports = { NumberWhats, CheckEmail };
