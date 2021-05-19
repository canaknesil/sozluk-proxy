import requests as req

def get_request(url, params):
    r = req.get(url=url, params=params)
    return r.json()


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

def adlar(ara):
    return get_request("https://sozluk.gov.tr/adlar",
                       {'ara': ara})

def terim(eser_ad, ara):
    return get_request("https://sozluk.gov.tr/terim",
                       {'eser_ad': eser_ad,
                        'ara': ara})


def test():
    print(gts("araba"))
    print(oneri("araba"))
    print(yazim("araba"))
    print(taramaId("1111"))
    print(gts_id("1111"))
    print(adlar("can"))
    print(terim("87"))


if __name__ == "__main__":
    test()
