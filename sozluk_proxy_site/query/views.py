from django.shortcuts import render

import django.http as dh
from . import tdk_sozluk_web_api as tdk
import json


def error_json(err_str):
    return json.dumps({'error': err_str})

def json_response(json_str):
    return dh.HttpResponse(json_str, content_type='application/json')


def query(request):
    parameters = request.GET.dict()
    func = parameters.get('func')

    # For now only delegate to tdk interface.
    if func is not None:
        tdk_response = tdk.query(parameters)
        if tdk_response is not None:
            tdk_response = json.dumps(tdk_response, ensure_ascii=False, indent=2)
            return json_response(tdk_response)
        else:
            return json_response(error_json('TDK query error.'))
    else:
        return json_response(error_json('GET parameter func not provided.'))


