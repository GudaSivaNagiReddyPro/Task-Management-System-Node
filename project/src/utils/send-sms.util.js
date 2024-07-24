const { sms } = require("../configs/sms.config");
const { errorResponse } = require("./response.util");

const client = require("twilio")(sms.twilioSID, sms.twilioToken);

const sendSms = async (phone_number, body) => {
  try {
    client.messages.create({
      from: sms.twilioNumber,
      to: phone_number,
      body,
    });
    console.log("Sms sent Successfully");
    return true;
  } catch (error) {
    return res.json(errorResponse("SOME_THING_WENT_WRONG_WHILE_SENDING_MAIL"));
  }
};

module.exports = { sendSms };
