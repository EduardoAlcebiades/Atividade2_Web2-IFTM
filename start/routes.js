"use strict";

const Route = use("Route");

Route.on("/").render("index");

Route.resource("/client", "ClientController").apiOnly();
Route.resource("/phone", "PhoneController").apiOnly();
