//TEST
import express from "express";
import axios from "axios";

module.exports = {
    home: (req, res) => {
        res.send("This is the home page");
    }
}