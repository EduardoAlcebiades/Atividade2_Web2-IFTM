"use strict";

const Client = use("App/Models/Client");
const Phone = use("App/Models/Phone");

class ClientController {
  async index({ request, response, view }) {
    const clients = await Client.all();

    return clients;
  }

  async store({ request, response }) {
    const data = request.only(["name", "email"]);

    const client = await Client.create(data);

    return client;
  }

  async show({ params, request, response, view }) {
    const id = params.id;

    const client = await Client.findOrFail(id);

    return client;
  }

  async update({ params, request, response }) {
    const id = params.id;
    const data = request.only(["name", "email"]);

    const client = await Client.findOrFail(id);

    client.merge(data);
    await client.save();

    return client;
  }

  async destroy({ params, request, response }) {
    const id = params.id;

    const client = await Client.findOrFail(id);
    
    await Phone.query().where("client_id", id).delete();
    await client.delete();
  }
}

module.exports = ClientController;
