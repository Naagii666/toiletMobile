import React, { Component } from 'react'
import axios from 'axios'

const BASE_URL = 'http://124.158.124.60:8080/'

export function request(token) {
	var axiosInstance = axios.create({
		baseURL: BASE_URL,
		headers: {
		  	'Authorization': 'bearer ' + token,
		  	'Content-Type': 'application/x-www-form-urlencoded'
	    }
	})

	return axiosInstance
}