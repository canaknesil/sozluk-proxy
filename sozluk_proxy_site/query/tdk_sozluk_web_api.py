import requests as req


def get_request(url, params):
    r = req.get(url=url, params=params)
    return r.json()


### TDK SERVICE INTERFACE ###


### TODO ADD DICTIONARY NAMES


def gts(ara):
    return get_request("https://sozluk.gov.tr/gts",
                       {'ara': ara})

def oneri(soz):
    return get_request("https://sozluk.gov.tr/oneri",
                       {'soz': soz})

def yazim(ara):
    return get_request("https://sozluk.gov.tr/yazim",
                       {'ara': ara})

def taramaId(id_var):
    return get_request("https://sozluk.gov.tr/taramaId",
                       {'id': id_var})

def gts_id(id_var):
    return get_request("https://sozluk.gov.tr/gts_id",
                       {'id': id_var})

def terim(eser_ad, ara):
    return get_request("https://sozluk.gov.tr/terim",
                       {'eser_ad': eser_ad,
                        'ara': ara})

def lehceler(ara, lehce):
    return get_request("https://sozluk.gov.tr/lehceler",
                       {'ara': ara,
                        'lehce': lehce})

def bati(ara):
    return get_request("https://sozluk.gov.tr/bati",
                       {'ara': ara})

def atasozu(ara):
    return get_request("https://sozluk.gov.tr/atasozu",
                       {'ara': ara})

def derleme(ara):
    return get_request("https://sozluk.gov.tr/derleme",
                       {'ara': ara})

def hemsirelik(ara):
    return get_request("https://sozluk.gov.tr/hemsirelik",
                       {'ara': ara})

def eczacilik(ara):
    return get_request("https://sozluk.gov.tr/eczacilik",
                       {'ara': ara})

def metroloji(ara):
    return get_request("https://sozluk.gov.tr/metroloji",
                       {'ara': ara})

def tarama(ara):
    return get_request("https://sozluk.gov.tr/tarama",
                       {'ara': ara})

def adlar(ara):
    return get_request("https://sozluk.gov.tr/adlar",
                       {'ara': ara})

def adlar2(ara, gore, cins):
    return get_request("https://sozluk.gov.tr/adlar",
                       {'ara': ara,
                        'gore': gore,
                        'cins': cins})

def kilavuz(prm, ara):
    return get_request("https://sozluk.gov.tr/kilavuz",
                       {'prm': prm,
                        'ara': ara})

def etms(ara):
    return get_request("https://sozluk.gov.tr/etms",
                       {'ara': ara})


### TEST ###

def test_func(name, out):
    print("TEST " + name)
    print("")
    print(out)
    print("")

def test():
    test_func("gts", gts("araba"))
    test_func("oneri", oneri("araba"))
    test_func("yazim", yazim("araba"))
    test_func("taramaId", taramaId("1111"))
    test_func("gts_id", gts_id("1111"))
    test_func("terim", terim("tümü", "ivme"))
    test_func("terim 2", terim("Fizik Terimleri Sözlüğü", "ivme"))

    # TODO rest

    test_func("adlar", adlar("can"))

if __name__ == "__main__":
    test()
