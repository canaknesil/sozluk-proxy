from django.shortcuts import render

import django.http as dh
from . import tdk_sozluk_web_api as tdk


def gts(request):
    ara = request.GET.get("ara", None)
    if ara is not None:
        return dh.HttpResponse("Hello, world. Value for parameter ara is " + ara + ".")
    else:
        return dh.HttpResponse("Hello, world. Parameter ara is not provided.")


