// function serviceOut(){
//     $('#ServiceOutModal').modal('toggle');
   
// };
// serviceOut();

$(document).ready(function(e) {
  $(document).on('click','.etms',function(){
    $('#tdk-srch-input').val($(this).text());
    $('#tdk-srch-form').submit();
  });
});

function turkceHarfYaz(e) {
    document.getElementById('tdk-srch-input').value += e;
    document.getElementById('tdk-srch-input').focus();
    $( "#tdk-search-btn-close" ).removeClass( "hidden-close" );
}

$(document).ready(function(){
  if($( window ).width() < 960){
        $('.tdk-bnr .contain h1').append("<a href=http://sozluk.gov.tr/ class=tdk-logo tdk-logo-swy resp resp--lrg>" +
          "<img src=/assets/img/logo-yeni-100px.jpg alt=TDK Sözlük />" +
        "</a>");
  }
});

$(document).ready(function(){
  $( "#tdk-srch-input" ).keypress(function() {
    $( "#tdk-search-btn-close" ).removeClass( "hidden-close" );
  });
});

$(document).ready(function(){
  $("#tdk-srch-input").keyup(function() {
    if (!this.value) {
        $( "#tdk-search-btn-close" ).addClass( "hidden-close" );
  }
  });
});

$(document).ready(function(){
  $("#tdk-search-btn-close").click(function() {
      document.getElementById('tdk-srch-input').value = "";
      $( "#tdk-search-btn-close" ).addClass( "hidden-close" );
      $('#tdk-srch-input').focus();
  });
});

$(document).ready(function(){
  $("#myBtn").click(function(){
    $("#TurkIsaretDiliSozluguModal").modal("toggle");
  });
});

$(document).ready(function(){
  $(':checkbox').not('#gts').click(function(){
      $('#tdk-srch-input').attr("placeholder", "Sözlüklerde Ara");
});

$(document).ready(function(){
    $(':checkbox').click(function(){
        if(!$('#ads,#bati,#ysk, #lehceler li input:checkbox,#iets,#hs,#ums,#ts,#ds,#kisiAdlariSoz li input:checkbox,#bst li input:checkbox,#bst li[value=-1] input:checkbox').is(':checked')){
            $('#tdk-srch-input').attr("placeholder", "Güncel Türkçe Sözlük'te Ara");
        }
      });
  });
});

$(document).ready(function(){
    $('#maddeleri-sar').css('display','none');
  });

$(document).ready(function(){
    $('#kisiAd0').click(function(){
      if($('#kisiAd0>input').is(':checked')){
        $('#kisiAd0 ol').css('display','block');
        $("#kisiAnlam0 input[type=checkbox]:not(:checked)").attr("disabled", true);
      }
      else{
        $('#kisiAd0 ol').css('display','none');
        $("#kisiAnlam0 input[type=checkbox]:not(:checked)").attr("disabled", false);
        $("#kisiAd0 ol input[type=checkbox]:checked").prop("checked", false);
      }
      if($('#kisiAd0 ol input').is(':checked')){
        $("#kisiAd0 ol input[type=checkbox]:not(:checked)").attr("disabled", true);
      }
      else{
        $("#kisiAd0 ol input[type=checkbox]:not(:checked)").attr("disabled", false);
      }
    });
    $('#kisiAnlam0').click(function(){
      if($('#kisiAnlam0>input').is(':checked')){
        $('#kisiAnlam0 ol').css('display','block');
        $("#kisiAd0 input[type=checkbox]:not(:checked)").attr("disabled", true);
      }
      else{
        $('#kisiAnlam0 ol').css('display','none');
        $("#kisiAd0 input[type=checkbox]:not(:checked)").attr("disabled", false);
        $("#kisiAnlam0 ol input[type=checkbox]:checked").prop("checked", false);
      }
      if($('#kisiAnlam0 ol input').is(':checked')){
        $("#kisiAnlam0 ol input[type=checkbox]:not(:checked)").attr("disabled", true);
      }
      else{
        $("#kisiAnlam0 ol input[type=checkbox]:not(:checked)").attr("disabled", false);
      }
    });
  });

let sksSozler="";
var nav = window.navigator,
ua = window.navigator.userAgent.toLowerCase();
M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
function anlamKiyasla(e){

    $('#maddeleri-sar').css('display','block');

    if(sksSozler === $(e).parent().siblings().children("p").children("strong")[0].innerHTML){
        return;
    }
    sksSozler = $(e).parent().siblings().children("p").children("strong")[0].innerHTML;
    alanlariTemizle();
    sozluklerIsChanged=true;
    $("#maddeleri-sar").prepend("<div id=maddeler--1" + " class=lead ></div>");

      $("#maddeler--1").append("<div id=hangisozluk--1" + " class=hangisozluk style='color:red;text-align:center;padding-bottom:1em'></div>");
      $('#hangisozluk--1').append("<b>Sıkça Karıştırılan Sözler</b>".toUpperCase());
      let x="";
      let y="";
      let notExist=false;
      let chg=0;
      let sbt=0;
    for (let index = 0; index < $(e).parent().siblings().children("p").children("strong").length; index++) {

          y=$(e).parent().siblings().children("p").children("strong")[index].innerHTML;
          if(/â/.test($(e).parent().siblings().children("p").children("strong")[index].innerHTML))
          {
            y = $(e).parent().siblings().children("p").children("strong")[index].innerHTML.replace('â','a');
            y=y.replace('â','a');
          }
          else if(/î/.test($(e).parent().siblings().children("p").children("strong")[index].innerHTML)){
            y = $(e).parent().siblings().children("p").children("strong")[index].innerHTML.replace('î','i');
            y=y.replace('î','i');
          }
          else if(/û/.test($(e).parent().siblings().children("p").children("strong")[index].innerHTML))
          {
            y = $(e).parent().siblings().children("p").children("strong")[index].innerHTML.replace('û','u');
            y=y.replace('û','u');
          }

          if(x.trim() === y.trim()){
            break;
          }
            let deg = encodeURI($(e).parent().siblings().children("p").children("strong")[index].innerHTML);
             $.ajax({
              url: 'https://sozluk.gov.tr/gts?ara=' + deg,
              dataType: 'json',
              type: 'get',
              success: function( data, textStatus, jQxhr ){

                if(data.error){
                  if(notExist){
                    $("#maddeler--1").append("<div id=bulunan-" + index + " class=lead style=font-size:40px;font-weight:bolder;color:red></div>");
                    $("#bulunan-" + index).html(data.error);
                      return;
                  }
                  notExist = true;
                  return;
                  }

                for (let sonuc in data) {
                    let roman=sonuc;
                    roman++;
                    let resp = data[sonuc];
                    console.log('/trident/i.test(M[1]) ::: ' + /trident/i.test(M[1]));
                      if(/trident/i.test(M[1])){
                        if(chg == 2 || chg == 1 || chg == 0){
                        if(chg == 1){
                          chg++;
                        }
                        else{
                          chg = sbt;
                          chg++;
                        }
                      }

                      $("#maddeler--1").append("<div id=bulunan-" + chg + sonuc + " class=lead style=font-size:22px;font-weight:bolder;color:blue></div>");
                      $("#maddeler--1").append("<div id=ozellikler-" + chg + sonuc + " class=lead style=font-size:20px;font-weight:bolder;color:orange !important></div>");
                      $("#maddeler--1").append("<div id=anlamlar-" + chg + sonuc + " class=lead style=font-size:20px;color:black !important></div>");

                      if(resp.taki !== null){
                        $("#bulunan-" + chg + sonuc).append(resp.madde  + ", <span>  -" + resp.taki + "</span>");
                      }
                      else{
                          $("#bulunan-" + chg + sonuc).append(resp.madde);
                      }
                      }
                      else{
                        $("#maddeler--1").append("<div id=bulunan-" + index + sonuc + " class=lead style=font-size:22px;font-weight:bolder;color:blue></div>");
                        $("#maddeler--1").append("<div id=ozellikler-" + index + sonuc + " class=lead style=font-size:20px;font-weight:bolder;color:orange !important></div>");
                        $("#maddeler--1").append("<div id=anlamlar-" + index + sonuc + " class=lead style=font-size:20px;color:black !important></div>");

                        if(resp.taki !== null){
                          $("#bulunan-" + index + sonuc).append(resp.madde  + ", <span>  -" + resp.taki + "</span>");
                        }
                        else{
                            $("#bulunan-" + index + sonuc).append(resp.madde);
                        }
                      }

                    var ozellikler="",ornekler="",
                        anlamlar="",anlamlarP="",
                        ozelliklerP="<i>",bilesiklerP="",
                        birlesikSozlerSonuc="",ilkAnlamTur=0,
                        ilkAnlamTamAdi="",ilkAnlamTamAdiBosliste="",
                        ikinciAnlamTur3=[],ilkAnlamTamAdi4="",
                        i,j,k,l;


                            for (i in resp.anlamlarListe) {
                              if(/343/.test(resp.anlamlarListe[i].anlam)){
                                  resp.anlamlarListe[i].anlam = resp.anlamlarListe[i].anlam.replace(/[^a-zA-ZıüöçğşÇĞŞâîûİÖÜÂÛÎ @]+/g, "<i>bakınız </i>");
                              }
                                anlamlar += resp.anlamlarListe[i].anlam;
                                if(null !== resp.anlamlarListe[i].ozelliklerListe &&
                                    resp.anlamlarListe[i].ozelliklerListe === undefined){
                                    if(ilkAnlamTamAdi != null && ilkAnlamTamAdi != undefined){
                                      ozellikler += ilkAnlamTamAdi;
                                      if(ilkAnlamTamAdi4 !== "" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined){
                                        ozellikler += ", " + ilkAnlamTamAdi4 + " " ;
                                      }
                                      else{
                                        ozellikler += " ";
                                      }
                                }
                                else{
                                        ozellikler += ilkAnlamTamAdiBosliste + "  ";
                                }
                            }
                            else {
                              for (let j in resp.anlamlarListe[i].ozelliklerListe) {

                                if(ilkAnlamTur === 0 ){
                                  if(resp.anlamlarListe[i].ozelliklerListe[j].tur != undefined && resp.anlamlarListe[i].ozelliklerListe[j].tur === "3"){
                                      ilkAnlamTur = resp.anlamlarListe[i].ozelliklerListe[j].tur;
                                      ilkAnlamTamAdi = resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                    }
                                }
                                else if(ilkAnlamTamAdi !=""){
                                  if(resp.anlamlarListe[i].ozelliklerListe[j].tur != undefined && i==0 &&  resp.anlamlarListe[i].ozelliklerListe[j].tur === "3"){
                                    ilkAnlamTur = resp.anlamlarListe[i].ozelliklerListe[j].tur;
                                    ilkAnlamTamAdi += ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                  }
                                  if(resp.anlamlarListe[i].ozelliklerListe[j].tur != undefined && i==0 &&  resp.anlamlarListe[i].ozelliklerListe[j].tur === "4"){
                                    ilkAnlamTamAdi4 = resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                  }
                                }

                                  if (resp.anlamlarListe[i].ozelliklerListe[j] !== undefined && resp.anlamlarListe[i].ozelliklerListe[j].tam_adi !== undefined &&
                                     resp.anlamlarListe[i].ozelliklerListe[j].tam_adi !== null &&
                                    (resp.anlamlarListe[i].ozelliklerListe[j].tur === "1" ||
                                  resp.anlamlarListe[i].ozelliklerListe[j].tur === "4" )){
                                    if(j == (resp.anlamlarListe[i].ozelliklerListe.length- 1) &&
                                  resp.anlamlarListe[i].ozelliklerListe.length > 1){
                                     ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                     if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP != "<i>"){
                                       ozelliklerP +=   ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + "  ";
                                     }
                                   }
                                   else{
                                     if(j == (resp.anlamlarListe[i].ozelliklerListe.length-1)){
                                       if(ilkAnlamTamAdi != null && ilkAnlamTamAdi != undefined){

                                         if(ilkAnlamTamAdi !== ""){
                                           if(ikinciAnlamTur3.length === 1 ){
                                             if(ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                               ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                             }
                                             else {
                                               ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                             }

                                           }
                                           else{
                                             if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                               ozellikler += ilkAnlamTamAdi +  ", " + ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                             }
                                             else{
                                               ozellikler += ilkAnlamTamAdi +  ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                             }
                                           }
                                        }
                                         else{
                                           if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                             ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                           }
                                           else {
                                             ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                           }
                                         }
                                         if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP == "<i>"){
                                           ozelliklerP += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + "  ";
                                         }
                                         if(resp.ozel_mi === "1"){
                                           ozellikler += " " ;
                                           if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                             ozelliklerP += ", özel " ;
                                           }
                                           else if(ozelliklerP.search("özel") === -1){
                                             ozelliklerP += "özel " ;
                                           }
                                         }
                                         else{
                                           ozellikler += " ";
                                         }
                                       }
                                     }
                                     else {
                                       if(ilkAnlamTamAdi != null && ilkAnlamTamAdi != undefined){

                                         if(ilkAnlamTamAdi !== ""){
                                           if(ikinciAnlamTur3.length === 1){
                                             if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                               ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                             }
                                             else {
                                               ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                             }
                                           }
                                           else {
                                             if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                               ozellikler += ilkAnlamTamAdi + ", " + ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                             }
                                             else {
                                               ozellikler += ilkAnlamTamAdi + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                             }

                                           }
                                         }
                                         else{
                                           if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                             ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                           }
                                           else {
                                             ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                           }
                                         }
                                         if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP != "<i>"){
                                           ozelliklerP +=   ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " , ";
                                         }
                                         if(resp.ozel_mi === "1"){
                                           ozellikler += " " ;
                                           if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                             ozelliklerP += ", özel " ;
                                           }
                                           else if(ozelliklerP.search("özel") === -1){
                                             ozelliklerP += "özel " ;
                                           }
                                         }
                                       }
                                     }

                                  }
                                  }
                                  else if(resp.anlamlarListe[i].ozelliklerListe[j] != undefined &&
                                     resp.anlamlarListe[i].ozelliklerListe[j].tam_adi != undefined &&
                                    resp.anlamlarListe[i].ozelliklerListe[j].tam_adi != null){
                                    if(j == (resp.anlamlarListe[i].ozelliklerListe.length- 1) ){
                                      if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                        if(resp.anlamlarListe[i].ozelliklerListe[j].tur === "3"){
                                          ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", " + ilkAnlamTamAdi4;
                                        }
                                        else {
                                          ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi ;
                                        }
                                      }
                                      else{
                                        ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                      }
                                      if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP == "<i>"){
                                        ozelliklerP += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                      }
                                      if(resp.ozel_mi === "1"){
                                        ozellikler += " " ;
                                        if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                          ozelliklerP += ", özel " ;
                                        }
                                        else if(ozelliklerP.search("özel") === -1){
                                          ozelliklerP += "özel " ;
                                        }
                                      }
                                      else {
                                         ozellikler += " "
                                      }
                                    }
                                   else{
                                    ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                    if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP == "<i>"){
                                      ozelliklerP += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                    }
                                    if(resp.ozel_mi === "1"){
                                      ozellikler += " ";
                                      if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                        ozelliklerP += ", özel " ;
                                      }
                                      else if(ozelliklerP.search("özel") === -1){
                                        ozelliklerP += "özel " ;
                                      }
                                    }
                                  }
                                  }
                              }
                            }

                                if (resp.anlamlarListe[i].orneklerListe !== null && resp.anlamlarListe[i].orneklerListe !== undefined) {
                                    anlamlar += ":";
                                    for (k in resp.anlamlarListe[i].orneklerListe) {
                                        if (resp.anlamlarListe[i].orneklerListe[k].yazar != null &&  typeof(resp.anlamlarListe[i].orneklerListe[k].yazar) !== "number"  ){
                                            var yazar = resp.anlamlarListe[i].orneklerListe[k].yazar[0].tam_adi;}
                                        else{
                                          var yazar = "";
                                        }
                                        if(yazar !== "" && yazar !==null){
                                          ornekler += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"" + "<i>" + resp.anlamlarListe[i].orneklerListe[k].ornek + "\" - </i>" + "<b>" + yazar + "</b><br>" ;
                                        }
                                        else
                                        ornekler += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>" + resp.anlamlarListe[i].orneklerListe[k].ornek + "</i><br>";
                                    }
                                }
                                else if(resp.anlamlarListe[i].orneklerListe !== null && resp.anlamlarListe[i].orneklerListe !== undefined){
                                  anlamlar += ".";
                                }
                                // if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1){
                                //   if(ozelliklerP == "" ){
                                //     ozelliklerP = ozellikler;
                                //   }
                                // }

                                let lastChar = ozellikler.slice(-2);

                                let sonOzellik = '';
                                if(lastChar === ', '){
                                  sonOzellik = ozellikler.slice(0,-2);
                                  ozellikler = sonOzellik + " ";
                                }

                                if (resp.anlamlarListe.length > 1 ) {
                                    if(ornekler !== ""){
                                      anlamlarP += "<p style='font-weight:bolder'><b>" + (+i+1) + ". </b>" + "<i style='color:orange'>" + ozellikler + "</i>"+ anlamlar + "<br>" + ornekler + "</p>";
                                    }
                                    else{
                                      anlamlarP += "<p style='font-weight:bolder'><b>" + (+i+1) + ". </b>" + "<i style='color:orange'>" + ozellikler + "</i>"+ anlamlar + "."
                                    }

                                      ozelliklerP="";
                                }
                                else { //tek anlamlı kelime
                                  if(ornekler !== ""){
                                    anlamlarP += "<p style='font-weight:bolder'>" + "<i>"  + "</i>" + anlamlar + "<br>" + ornekler + "</p>";
                                }
                                else{
                                  anlamlarP += "<p style='font-weight:bolder'>" + "<i>"  + "</i>" + anlamlar + ".";
                                }
                              }
                                ozellikler = "";ornekler="";anlamlar="";
                            }
                            if(resp.cogul_mu === "1"){
                              if(ozelliklerP !== "<i>"){
                                ozelliklerP += ", " + "çokluk" + ", ";
                              }
                              else {
                                ozelliklerP += "çokluk" + ", ";
                              }
                            }
                       if (resp.telaffuz !== null && resp.telaffuz !== '') {
                          if(ozelliklerP === "<i>"){
                           ozelliklerP += "(" + resp.telaffuz + ")" ;
                          }
                          else
                          ozelliklerP += ", (" + resp.telaffuz + ")" ;

                       }

                    if(resp.lisan !== null && resp.lisan !== ""){
                        if(ozelliklerP === "<i>"){
                            ozelliklerP +=resp.lisan;
                          }
                        else{
                            ozelliklerP +=", " + resp.lisan;
                          }
                      }
                    let setOzelliklerP = ozelliklerP.split(',').map(function(item) {return item.trim()} );
                    let nowArray= setOzelliklerP;
                    nowArray = nowArray.filter(function(item) {return item.trim() != ""}).map(function(k){return " " + k});
                    ozelliklerP = "<i>";
                    ozelliklerP += nowArray.toString();
                    ozelliklerP += "</i>";
                      if (/trident/i.test(M[1])){
                        $('#ozellikler-'+ chg + sonuc).append(ozelliklerP);
                        ozelliklerP="";
                        $('#anlamlar-'+ chg + sonuc).append(anlamlarP);
                      }
                      else{
                        $('#ozellikler-'+ index + sonuc).append(ozelliklerP);
                        ozelliklerP="";
                        $('#anlamlar-'+ index + sonuc).append(anlamlarP);
                      }


                }
              }
          });
            x = y;
    }
    let body = $("html, body");
    body.stop().animate({scrollTop:0}, 750, 'swing', function() {

    });
}

function secimleriKaldir() {
    $('input[type = checkbox]:checked').prop('checked',false);
    $("#lehceler li input[type=checkbox]:not(:checked)").attr("disabled", false);
    $("#kisiAdlariSoz li ol li input[type=checkbox]:not(:checked)").attr("disabled", false);
    $("#kisiAdlariSoz li ol").css("display", 'none');
    $("#kisiAdlariSoz li input[type=checkbox]:not(:checked)").attr("disabled", false);
}

$(document).ready(function() {
  $('*','body').not('.autocmp').click(function () {
        $('.autocmp').hide();
      } );
  });

  $(document).ready(function() {

    if($( window ).width() < 768){
          $('#guncelSozlukHakkinda > a').html('GTS Hakkında <span class="caret"></span>');
    }
    else{
      return;
    }
  });

var kelime = ""
  $(document).ready(function() {
    $('input[value=gts]').attr('checked',true);
    
      let value="gts";
      let sozlukler=["gts"]
    if(window.location.href.split('/').pop()){
      
        kelime = window.location.href.split('/').pop()
        kelime = decodeURI(kelime.toLowerCase())
        let indexNe = null;
        let newKelime = null;
        indexNe = kelime.indexOf(' ne demek');
        if(indexNe !== -1){
          newKelime = kelime.slice(0,indexNe);
        }
        else {
          indexNe = kelime.indexOf(' nedir');
          if(indexNe !== -1){
            newKelime = kelime.slice(0,indexNe);
          }
          else{
            indexNe = kelime.indexOf(' anlam');
            if(indexNe !== -1){
              newKelime = kelime.slice(0,indexNe);
            }
            else{
              indexNe = kelime.indexOf(' tdk');
              if(indexNe !== -1){
                newKelime = kelime.slice(0,indexNe);
              }
              else{
                indexNe = kelime.indexOf('tdk');
                
                if(indexNe === 0){
                 
                newKelime = kelime.slice(4,kelime.length);
                }
                else{
                  indexNe = kelime.indexOf(' sözlük');
                  if(indexNe !== -1){
                  newKelime = kelime.slice(0,indexNe);
                  }
                  else{
                    indexNe = kelime.indexOf('sözlük');
                    if(indexNe === 0){
                      newKelime = kelime.slice(7,kelime.length);
                    }
                  else{
                    newKelime = kelime;
                  }
                    
                  }
                }
              }
            }
          }
        }

        $('#aranan').val(newKelime);
          $('#maddeleri-sar').css('display','block');
          $("#tdk-cont tdk-home-t1").css('display', 'block');
            $("#maddeleri-sar").prepend("<div id=maddeler--2" + " class=lead ></div>");
            let vlu=$('#aranan').val().trim();
            if(/I/.test($('#aranan').val())){
              vlu = $('#aranan').val().trim().replace('I','ı');
            }
            else if(/İ/.test($('#aranan').val())){
              vlu = $('#aranan').val().trim().replace('İ','i');
            }
            else if(/Â/.test($('#aranan').val())) {
                vlu = $('#aranan').val().trim().replace('Â','â');
            }
            let deg="";
            if(/Ş/.test($('#aranan').val()) ||
             /Ü/.test($('#aranan').val()) || /Ö/.test($('#aranan').val()) || /Ğ/.test($('#aranan').val()) || /Ç/.test($('#aranan').val())){
                deg = encodeURI(vlu.toLowerCase());
            }
            else {
               deg = encodeURI(vlu.toLowerCase());
            }
        $.ajax({
                url: 'https://sozluk.gov.tr/gts?ara=' + deg,
                dataType: 'json',
                type: 'get',
                success: function( data, textStatus, jQxhr ){
                  $('#maddeleri-sar').css('display','block');
                  $("#maddeler--2").append("<div id=hangisozluk--2" + " class=hangisozluk style='color:red;text-align:center;padding-bottom:1em'></div>");
                  $('#hangisozluk--2').append("<b>Güncel Türkçe Sözlük</b>".toUpperCase());

                  let sapkaVarmi=false;
                  if(data != null){
                  for(let p=0 ; p < data.length; p++){
                    if(/â/.test(data[p].madde) || /î/.test(data[p].madde) || /û/.test(data[p].madde)){
                        sapkaVarmi=true;
                    }
                  }
                }
                  if ( (data.error)){
                   
                    if(sozlukler[0] === "gts" && sozlukler.length === 1 )
                    $('#maddeleri-sar').css('display','none');
                      $.ajax({
                        url: 'https://sozluk.gov.tr/oneri?soz=' + deg,
                        dataType: 'json',
                        type: 'get',
                        success: function( data, textStatus, jQxhr ){
                          if(data.length > 0){
                            console.log('sozlukler ::: ' + sozlukler);
                                $(".autocmp").css('display','block');
                                $("#buSoz").remove();
                                $("#bosluk1").remove();
                                $("#oneriBasl").remove();
                                $("#bosluk2").remove();
                                $(".autocmp").append("<span id=buSoz style=display:block;color:red class='line' value='" + 0 + "' "  + ">" + "<b>Bu söz Güncel Türkçe Sözlük'te bulunamadı.</b>" + "</span>");
                                $(".autocmp").append("<span id=bosluk1 style=display:block class='line' value='" + 1 + "' "  + "></span>");
                                $(".autocmp").append("<span id=oneriBasl style=display:block;color:blue class='line' value='" + 2 + "' "  + ">" + "<b>Öneriler</b>" + "</span>");
                                $(".autocmp").append("<span id=bosluk2 style=display:block class='line' value='" + 3 + "' "  + "></span>");

                            for (let key in data) {
                              if(key == 0)
                                $(".autocmp").append("<div class='line selected' value='" + key + "' "  + ">" + "<b>" + data[key].madde + "</b>" + "</div>");
                              else
                                $(".autocmp").append("<div class='line' value='" + key + "' "  + ">" + "<b>" + data[key].madde + "</b>" + "</div>");
                              }

                                $(".autocmp div").bind("click",function(){
                                  doSet(this);
                                  $('#tdk-srch-form').submit();
                                  $('.autocmp').hide();
                                  $('.autocmp').fadeOut();
                                  $(".autocmp").empty();
                                  autocmpSelected=false;
                                });
                          }
                          else{
                          $("#maddeler--2" + index).append("<div id=bulunmayan-" + value + " class=lead style=font-weight:bolder;color:red >Bu söz bulunamadı.</div>");
                          return false
                          }
                          
                        },
                        error: function(error){
  
                        }
                      });
                      return false;
                     
                  }
                  else if (data != null) {
                    if(data !== null && data !== undefined && data.error === undefined ){
                      data.sort(function(a,b){
                        let x = false;
                        let y = false;
                        if (/â/.test(a.madde) || /î/.test(a.madde) || /û/.test(a.madde)) {
                            x = true;
                        }
                        else if(/â/.test(b.madde) || /î/.test(b.madde) || /û/.test(b.madde)) {
                            y = true;
                        }
                        if(x == true && y ==false){
                          if(a.madde_id < b.madde_id)
                          return b.madde_id - a.madde_id;
                          else
                          return a.madde_id - b.madde_id;
                        }
                        else if(y == true && x==false){
                          if(b.madde_id < a.madde_id)
                          return b.madde_id - a.madde_id;
                          else
                          return a.madde_id - b.madde_id;
                        }
                        else {
                          return null;
                        }
                      });
                    }

                    let birSapkasiz = 0;
                    let birSapkasizBirdenCokSapkali = 0;
                    let birSapkasizBirdenCokSapkaliMi = false;
                    data !== undefined ?
                    data.some(function(item) {
                        if(!(/Â/.test(item.madde) || /â/.test(item.madde) || /î/.test(item.madde) || /û/.test(item.madde))){
                            birSapkasiz += 1
                        }
                        else{
                          birSapkasizBirdenCokSapkali += 1
                        }
                      }) : ""
                      if(birSapkasiz === 1 && birSapkasizBirdenCokSapkali > 1){
                        birSapkasizBirdenCokSapkaliMi = true
                      }

                  //en az bir sonuç var
                      $("#isaretDili").css('margin-bottom','20px').css('font-size',16);
                      $("#isaretDili").append("<div id=isaretSoz class=maddeler ></div>");
                      $("#isaretSoz").append("<div id=isaretSozluk class=hangisozluk style=color:black !important;></div>");
                      $("#isaretSozluk").html("Türk İşaret Dili <br> Parmak Alfabesiyle Gösterilişi");
                      $("#isaretSoz").append("<div id=isaretBulunan class=isaretBulunan style=color:black !important></div>");
                      $("#isaretSoz").append(" <hr class=hr-primary />");
                      let vle = $('#aranan').val();
                      if(/I/.test($('#aranan').val())){
                        vle = $('#aranan').val().replace('I','ı');
                      }
                      else if(/İ/.test($('#aranan').val())){
                        vle = $('#aranan').val().replace('İ','i');
                      }
                      parmaklar('#isaretBulunan',0,vle.trim().toLowerCase());
                      let ozel=true;
                      data.some(function(item){
                          if(item.ozel_mi === "0"){
                              ozel=false;
                          }
                        });

                      for (var sonuc in data) {
                          var sapkali = false;
                          var roman = sonuc;
                          roman++;
                          $("#maddeler--2").append("<div id=bulunan-" + value + sonuc + " class=lead style=font-size:40px;font-weight:bolder;color:blue></div>");
                          $("#maddeler--2").append("<div id=ozellikler-" + value + sonuc + " class=lead style=font-size:20px;font-weight:bolder;color:orange !important></div>");
                          $("#maddeler--2").append("<div id=anlamlar-" + value + sonuc + " class=lead style=font-size:20px;color:black !important></div>");

                          if(atadeyim && !isGts){
                            $("#maddeler--2").append('<button id=geriBirlesik class=btn onclick=geriDon()></button>');
                            $('#geriBirlesik').html('<span class="glyphicon glyphicon-chevron-left" style=color:white></span><strong style=margin-left:10px;font-size:15px>' + anaSoz + '</strong>');
                          }
                          atadeyim=false;

                          var resp = data[sonuc];
                            if((resp.birlesikler !== undefined && resp.birlesikler !== null) && resp.atasozu !== undefined) {
                            $("#maddeler--2").append("<div class=accordion id=accordionExample-" + value + sonuc + ">"
                            +  " <div class=card>"
                            + " <div class=card-header id=headingOne>"
                            + " <h5 class=mb-0>"
                            + " <button class=btn btn-link type=button data-toggle=collapse data-target=#ataSozler-" + value + sonuc + " aria-expanded=true aria-controls=ataSozler>"
                            + " <strong style=padding:5px;font-size:15px>Atasözleri, Deyimler veya Birleşik Fiiller</strong>"
                            + " </button>"
                            + " </h5>"
                            + " </div>"
                            + " <div id=ataSozler-" + value + sonuc + " class=collapse aria-labelledby=headingTwo data-parent=#accordionExample-" + value + sonuc + ">"
                            + " <div id=ataSoz-" + value + sonuc + " class=card-body ataSoz-" + value + sonuc + ">"
                            + " </div>"
                            + " </div>"
                            + " </div>"
                            + " <div class=card>"
                            + " <div class=card-header id=headingTwo>"
                            + " <h5 class=mb-0>"
                            + " <button class=btn btn-link collapsed type=button data-toggle=collapse data-target=#birlesikler-" + value + sonuc
                            + "  aria-expanded=false aria-controls=collapseTwo>"
                            + " <strong style=padding:5px;font-size:15px>Birleşik Kelimeler</strong>"
                            + " </button>"
                            + " </h5>"
                            + " </div>"
                            + " <div id=birlesikler-" + value + sonuc + " class=collapse aria-labelledby=headingTwo data-parent=#accordionExample-" + value + sonuc + ">"
                            + " <div id=birlesik-" + value + sonuc + " class=card-body birlesik-" + value + sonuc + ">"
                            + " </div>"
                            + " </div>"
                            + " </div>"
                            + "</div>");
                           }
                           else if(resp.atasozu !== undefined){
                             $("#maddeler--2").append("<div class=accordion id=accordionExample-" + value + sonuc + ">"
                             +  " <div class=card>"
                             + " <div class=card-header id=headingOne>"
                             + " <h5 class=mb-0>"
                             + " <button class=btn btn-link type=button data-toggle=collapse data-target=#ataSozler-" + value + sonuc + " aria-expanded=true aria-controls=ataSozler>"
                             + " <strong style=padding:5px;font-size:15px>Atasözleri, Deyimler veya Birleşik Fiiller</strong>"
                             + " </button>"
                             + " </h5>"
                             + " </div>"
                             + " <div id=ataSozler-" + value + sonuc + " class=collapse aria-labelledby=headingTwo data-parent=#accordionExample-" + value + sonuc + ">"
                             + " <div id=ataSoz-" + value + sonuc + " class=card-body ataSoz-" + value + sonuc + ">"
                             + " </div>"
                             + " </div>"
                             + " </div>"
                             + "</div>");
                           }
                           else if(resp.birlesikler !== undefined && resp.birlesikler !== null){
                             $("#maddeler--2").append("<div class=accordion id=accordionExample-" + value + sonuc + ">"
                             + " <div class=card>"
                             + " <div class=card-header id=headingTwo>"
                             + " <h5 class=mb-0>"
                             + " <button class=btn btn-link collapsed type=button data-toggle=collapse data-target=#birlesikler-" + value + sonuc
                             + "  aria-expanded=false aria-controls=collapseTwo>"
                             + " <strong style=padding:5px;font-size:15px>Birleşik Kelimeler</strong>"
                             + " </button>"
                             + " </h5>"
                             + " </div>"
                             + " <div id=birlesikler-" + value + sonuc + " class=collapse aria-labelledby=headingTwo data-parent=#accordionExample-" + value + sonuc + ">"
                             + " <div id=birlesik-" + value + sonuc + " class=card-body birlesik-" + value + sonuc + ">"
                             + " </div>"
                             + " </div>"
                             + " </div>"
                             + "</div>");
                           }

                          $("#ozellikler-" + value + sonuc).append(ozelliklerP);

                          if(/â/.test(resp.madde) || /î/.test(resp.madde) || /û/.test(resp.madde)){
                              sapkali=true;
                          }

                          if(resp.on_taki != null){
                             resp.madde = resp.on_taki + resp.madde;
                          }

                          if(sapkali){

                            if(resp.taki !== null){
                              $('#bulunan-' + value + sonuc).append(resp.madde + ", <span>  -" + resp.taki + "</span>");
                            }
                            else{
                              $('#bulunan-' + value + sonuc).append(resp.madde);
                            }
                          }
                          else{
                          if(resp.ozel_mi === "0" && data.length > 1 && data.length !=2 && birSapkasizBirdenCokSapkaliMi === false){
                            if(resp.taki !== null){
                              $('#bulunan-' + value + sonuc).append(resp.madde   + ", <span>  -" + resp.taki + "</span>" + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>');
                            }
                            else{
                              $('#bulunan-' + value + sonuc).append(resp.madde + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>' );
                            }
                          }
                          else if(data.length == 1){
                            if(resp.taki !== null){
                              $('#bulunan-' + value + sonuc).append(resp.madde + ", <span>  -" + resp.taki + "</span>");
                            }
                            else{
                              $('#bulunan-' + value + sonuc).append(resp.madde);
                            }
                          }
                          else{
                            let salMi = data.filter(function(item) { return item.ozel_mi === "1" }) ;
                            if(salMi.length > 0){
                             if(data.length > 1 && ozel && birSapkasizBirdenCokSapkaliMi === false){
                                if(resp.taki !== null){
                                  $('#bulunan-' + value + sonuc).append(resp.madde   + ", <span>  -" + resp.taki + "</span>" + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>');
                                }
                                else{
                                  $('#bulunan-' + value + sonuc).append(resp.madde + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>' );
                                }
                              }
                              else {
                                if(resp.taki !== null){
                                  $('#bulunan-' + value + sonuc).append(resp.madde + ", <span>  -" + resp.taki + "</span>");
                                }
                                else{
                                  $('#bulunan-' + value + sonuc).append(resp.madde);
                                }
                              }

                            }
                            else if(data.length != 2 && birSapkasizBirdenCokSapkaliMi === false){
                              if(resp.taki !== null){
                                $('#bulunan-' + value + sonuc).append(resp.madde   + ", <span>  -" + resp.taki + "</span>" + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>');
                              }
                              else{
                                $('#bulunan-' + value + sonuc).append(resp.madde + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>' );
                              }
                            }
                            else if(data.length == 2 && !sapkaVarmi && birSapkasizBirdenCokSapkaliMi === false){
                              if(resp.taki !== null){
                                $('#bulunan-' + value + sonuc).append(resp.madde   + ", <span>  -" + resp.taki + "</span>" + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>');
                              }
                              else{
                                $('#bulunan-' + value + sonuc).append(resp.madde + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>' );
                              }
                            }
                            else{
                              if(resp.taki !== null){
                                $('#bulunan-' + value + sonuc).append(resp.madde + ", <span>  -" + resp.taki + "</span>");
                              }
                              else{
                                $('#bulunan-' + value + sonuc).append(resp.madde);
                              }
                            }

                          }
                        }

                          var ozellikler="",ornekler="",
                              anlamlar="",anlamlarP="",
                              ozelliklerP="<i>",bilesiklerP="",
                              birlesikSozlerSonuc="",ilkAnlamTur=0,
                              ilkAnlamTamAdi="",ilkAnlamTamAdiBosliste="",
                              ikinciAnlamTur3=[],ilkAnlamTamAdi4="",
                              i,j,k,l;


                                  for (i in resp.anlamlarListe) {
                                    if(resp.anlamlarListe[i].ozelliklerListe !== undefined){
                                      ikinciAnlamTur3 = resp.anlamlarListe[i].ozelliklerListe.filter(function(item){
                                          return item.tur === "3";
                                      });
                                    }

                                    if(/343/.test(resp.anlamlarListe[i].anlam)){
                                        resp.anlamlarListe[i].anlam = resp.anlamlarListe[i].anlam.replace(/[^a-zA-ZıüöçğşÇĞŞâîûİÖÜÂÛÎ @]+/g, "<i>bakınız </i>");
                                    }
                                      anlamlar += resp.anlamlarListe[i].anlam;
                                      if(null !== resp.anlamlarListe[i].ozelliklerListe &&
                                          resp.anlamlarListe[i].ozelliklerListe === undefined){
                                          if(ilkAnlamTamAdi != null && ilkAnlamTamAdi != undefined){
                                                ozellikler += ilkAnlamTamAdi;
                                                if(ilkAnlamTamAdi4 !== "" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined){
                                                  ozellikler += ", " + ilkAnlamTamAdi4 + " " ;
                                                }
                                                else{
                                                  ozellikler += " ";
                                                }
                                          }
                                          else{
                                                  ozellikler += ilkAnlamTamAdiBosliste + "  ";
                                          }
                                      }
                                      else {
                                        for (let j in resp.anlamlarListe[i].ozelliklerListe) {

                                          if(ilkAnlamTur === 0 ){
                                            if(resp.anlamlarListe[i].ozelliklerListe[j].tur != undefined && resp.anlamlarListe[i].ozelliklerListe[j].tur === "3"){
                                                ilkAnlamTur = resp.anlamlarListe[i].ozelliklerListe[j].tur;
                                                ilkAnlamTamAdi = resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                              }
                                          }
                                          else if(ilkAnlamTamAdi !=""){
                                            if(resp.anlamlarListe[i].ozelliklerListe[j].tur != undefined && i==0 &&  resp.anlamlarListe[i].ozelliklerListe[j].tur === "3"){
                                              ilkAnlamTur = resp.anlamlarListe[i].ozelliklerListe[j].tur;
                                              ilkAnlamTamAdi += ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                            }
                                            if(resp.anlamlarListe[i].ozelliklerListe[j].tur != undefined && i==0 &&  resp.anlamlarListe[i].ozelliklerListe[j].tur === "4"){
                                              ilkAnlamTamAdi4 = resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                            }
                                          }

                                            if (resp.anlamlarListe[i].ozelliklerListe[j] !== undefined && resp.anlamlarListe[i].ozelliklerListe[j].tam_adi !== undefined &&
                                               resp.anlamlarListe[i].ozelliklerListe[j].tam_adi !== null &&
                                              (resp.anlamlarListe[i].ozelliklerListe[j].tur === "1" ||
                                            resp.anlamlarListe[i].ozelliklerListe[j].tur === "4" )){
                                              if(j == (resp.anlamlarListe[i].ozelliklerListe.length- 1) &&
                                            resp.anlamlarListe[i].ozelliklerListe.length > 1){
                                               ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                               if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP != "<i>"){
                                                ozelliklerP +=   ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + "  ";
                                               }
                                              }
                                             else{
                                               if(j == (resp.anlamlarListe[i].ozelliklerListe.length-1)){
                                                 if(ilkAnlamTamAdi != null && ilkAnlamTamAdi != undefined){

                                                   if(ilkAnlamTamAdi !== ""){
                                                     if(ikinciAnlamTur3.length === 1 ){
                                                       if(ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                         ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                       }
                                                       else {
                                                         ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                       }

                                                     }
                                                     else{
                                                       if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                         ozellikler += ilkAnlamTamAdi +  ", " + ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                       }
                                                       else{
                                                         ozellikler += ilkAnlamTamAdi +  ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                       }
                                                     }
                                                  }
                                                   else{
                                                     if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                       ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                     }
                                                     else {
                                                       ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                                     }
                                                   }
                                                   if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP == "<i>"){
                                                    ozelliklerP += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + "  ";
                                                   }
                                                   if(resp.ozel_mi === "1"){
                                                     // ozellikler += ", özel " ;
                                                     if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                                       ozelliklerP += ", özel " ;
                                                     }
                                                     else if(ozelliklerP.search("özel") === -1){
                                                       ozelliklerP += "özel " ;
                                                     }
                                                   }
                                                   else{
                                                     ozellikler += " ";
                                                   }
                                                 }
                                               }
                                               else {
                                                 if(ilkAnlamTamAdi != null && ilkAnlamTamAdi != undefined){

                                                   if(ilkAnlamTamAdi !== ""){
                                                     if(ikinciAnlamTur3.length === 1){
                                                       if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                         ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                       }
                                                       else {
                                                         ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                       }
                                                     }
                                                     else {
                                                       if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                         ozellikler += ilkAnlamTamAdi + ", " + ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                       }
                                                       else {
                                                         ozellikler += ilkAnlamTamAdi + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                       }

                                                     }
                                                   }
                                                   else{
                                                     if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                       ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                     }
                                                     else {
                                                       ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                     }
                                                   }
                                                   if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP != "<i>"){
                                                    ozelliklerP +=   ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " , ";
                                                   }
                                                   if(resp.ozel_mi === "1"){
                                                     // ozellikler += " özel, " ;
                                                     if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                                       ozelliklerP += ", özel " ;
                                                     }
                                                     else if(ozelliklerP.search("özel") === -1){
                                                       ozelliklerP += "özel " ;
                                                     }
                                                   }
                                                 }
                                               }

                                            }
                                            }
                                            else if(resp.anlamlarListe[i].ozelliklerListe[j] != undefined &&
                                               resp.anlamlarListe[i].ozelliklerListe[j].tam_adi != undefined &&
                                              resp.anlamlarListe[i].ozelliklerListe[j].tam_adi != null){
                                              if(j == (resp.anlamlarListe[i].ozelliklerListe.length- 1) ){
                                                if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                  if(resp.anlamlarListe[i].ozelliklerListe[j].tur === "3"){
                                                    ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", " + ilkAnlamTamAdi4;
                                                  }
                                                  else {
                                                    ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi ;
                                                  }
                                                }
                                                else{
                                                  ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                                }
                                                if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP == ""){
                                                 ozelliklerP += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                }
                                                if(resp.ozel_mi === "1"){
                                                  // ozellikler += ", özel " ;
                                                  if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                                    ozelliklerP += ", özel " ;
                                                  }
                                                  else if(ozelliklerP.search("özel") === -1){
                                                    ozelliklerP += "özel " ;
                                                  }
                                                }
                                                else {
                                                   ozellikler += " "
                                                }
                                              }
                                             else{
                                              ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                              if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP == ""){
                                               ozelliklerP += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                              }
                                              if(resp.ozel_mi === "1"){
                                                // ozellikler += "özel, ";
                                                if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                                  ozelliklerP += ", özel " ;
                                                }
                                                else if(ozelliklerP.search("özel") === -1){
                                                  ozelliklerP += "özel " ;
                                                }
                                              }
                                            }
                                            }
                                        }
                                      }


                                      if (resp.anlamlarListe[i].orneklerListe !== null && resp.anlamlarListe[i].orneklerListe !== undefined) {
                                          anlamlar += ":";
                                          for (k in resp.anlamlarListe[i].orneklerListe) {
                                              if (resp.anlamlarListe[i].orneklerListe[k].yazar != null &&  typeof(resp.anlamlarListe[i].orneklerListe[k].yazar) !== "number"  ){
                                                  var yazar = resp.anlamlarListe[i].orneklerListe[k].yazar[0].tam_adi;}
                                              else{
                                                var yazar = "";
                                              }
                                              if(yazar !== "" && yazar !==null){
                                                ornekler += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"" + "<i>" + resp.anlamlarListe[i].orneklerListe[k].ornek + "\" - </i>" + "<b>" + yazar + "</b><br>" ;
                                              }
                                              else
                                              ornekler += "<i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + resp.anlamlarListe[i].orneklerListe[k].ornek + "</i><br>";
                                          }
                                      }
                                      else if(resp.anlamlarListe[i].orneklerListe !== null && resp.anlamlarListe[i].orneklerListe !== undefined){
                                        anlamlar += ".";
                                      }
                                      // if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1){
                                      //   if(ozelliklerP == "" ){
                                      //     ozelliklerP = ozellikler;
                                      //   }
                                      // }

                                      let lastChar = ozellikler.slice(-2);

                                      let sonOzellik = '';
                                      if(lastChar === ', '){
                                        sonOzellik = ozellikler.slice(0,-2);
                                        ozellikler = sonOzellik + " ";
                                      }
                                      if (resp.anlamlarListe.length > 1 ) {
                                          if(ornekler !== ""){
                                            anlamlarP += "<p style='font-weight:bolder'><b>" + (+i+1) + ". </b>" + "<i style='color:orange'>" + ozellikler + "</i>"+ anlamlar + "<br>" + ornekler + "</p>";
                                          }
                                          else{
                                            anlamlarP += "<p style='font-weight:bolder'><b>" + (+i+1) + ". </b>" + "<i style='color:orange'>" + ozellikler + "</i>"+ anlamlar + "."
                                          }
                                      }
                                      else { //tek anlamlı kelime
                                        if(ornekler !== ""){
                                          anlamlarP += "<p style='font-weight:bolder'>" + anlamlar + "<br>" + ornekler + "</p>";
                                      }
                                      else{
                                        anlamlarP += "<p style='font-weight:bolder'>" + anlamlar + ".";
                                      }
                                    }
                                      ozellikler = "";ornekler="";anlamlar="";
                                  }
                                  if(resp.cogul_mu === "1"){
                                    if(ozelliklerP !== "<i>"){
                                      ozelliklerP += ", " + "çokluk" + ", ";
                                    }
                                    else {
                                      ozelliklerP += "çokluk" + ", ";
                                    }
                                  }
                             if (resp.telaffuz !== null && resp.telaffuz !== '') {
                                if(ozelliklerP === "<i>"){
                                 ozelliklerP += "(" + resp.telaffuz + ")" ;
                                }
                                else
                                ozelliklerP += ", (" + resp.telaffuz + ")" ;
                              }

                          if(resp.lisan !== null && resp.lisan !== ""){
                              if(ozelliklerP === "<i>"){
                                  ozelliklerP +=resp.lisan;
                                }
                              else{
                                  ozelliklerP +=", " + resp.lisan;
                                }
                            }
                          let setOzelliklerP = ozelliklerP.split(',').map(function(item) {return item.trim()} );
                          let nowArray= setOzelliklerP;
                          nowArray = nowArray.filter(function(item) {return item.trim() != ""}).map(function(k){return " " + k});
                          ozelliklerP = "<i>";
                          ozelliklerP += nowArray.toString() ;
                          ozelliklerP += "</i>";
                          $('#ozellikler-'+ value + sonuc).append(ozelliklerP);
                          ozelliklerP="";
                          $('#anlamlar-'+ value + sonuc).append(anlamlarP);
                          let ataSozlerSonuc = "<table class=table-bordered style=font-weight:normal;font-size:18px>";
                            if(resp.atasozu !== null && resp.atasozu !== "" && resp.atasozu !== undefined){
                              for (let birsonuc in resp.atasozu) {
                                if($( window ).width() < 768){
                                  if(birsonuc % 2 == 0){
                                    ataSozlerSonuc += "<tr><td>";
                                    ataSozlerSonuc += "<a><span class=oneriler value=" + resp.atasozu[birsonuc].madde_id + " >" + $.trim(resp.atasozu[birsonuc].madde) + "</span></a>";
                                  $('#accordionExample-' + value + sonuc + ' #ataSoz-' + value + sonuc).html(ataSozlerSonuc + "</td></tr>");
                                  }
                                  else{
                                    ataSozlerSonuc += "<td>";
                                    ataSozlerSonuc += "<a><span class=oneriler value=" + resp.atasozu[birsonuc].madde_id + " >" + $.trim(resp.atasozu[birsonuc].madde) + "</span></a>";
                                  $('#accordionExample-' + value + sonuc + ' #ataSoz-' + value + sonuc).html(ataSozlerSonuc + "</td>");
                                  }
                                }
                                else {
                                  if(birsonuc % 3 == 0){
                                    ataSozlerSonuc += "<tr><td>";
                                    ataSozlerSonuc += "<a><span class=oneriler value=" + resp.atasozu[birsonuc].madde_id + " >" + $.trim(resp.atasozu[birsonuc].madde) + "</span></a>";
                                  $('#accordionExample-' + value + sonuc + ' #ataSoz-' + value + sonuc).html(ataSozlerSonuc + "</td></tr>");
                                  }
                                  else{
                                    ataSozlerSonuc += "<td>";
                                    ataSozlerSonuc += "<a><span class=oneriler value=" + resp.atasozu[birsonuc].madde_id + " >" + $.trim(resp.atasozu[birsonuc].madde) + "</span></a>";
                                  $('#accordionExample-' + value + sonuc + ' #ataSoz-' + value + sonuc).html(ataSozlerSonuc + "</td>");
                                  }
                                }

                              }
                            }

                            if(resp.birlesikler !== null){
                            let birlesiklerPbyNotComma = resp.birlesikler.split(',');
                            birlesikSozlerSonuc += "<table class=table-bordered style=font-weight:normal;font-size:18px><tbody>";
                            for (let birsonuc in birlesiklerPbyNotComma) {

                              if($( window ).width() < 768){
                                if(birsonuc % 2 == 0){
                                  birlesikSozlerSonuc += "<tr><td>";
                                  birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                    $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td></tr>");
                                }
                                else{
                                  birlesikSozlerSonuc += "<td>";
                                  birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                    $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td>");
                                }
                              }
                              else if($( window ).width() > 767 && $( window ).width() < 992){
                                if(birsonuc % 4 == 0){
                                  birlesikSozlerSonuc += "<tr><td>";
                                  birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                    $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td></tr>");
                                }
                                else{
                                  birlesikSozlerSonuc += "<td>";
                                  birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                    $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td>");
                                }
                              }
                              else if($( window ).width() > 991 && $( window ).width() < 1081){
                                if(birsonuc % 5 == 0){
                                  birlesikSozlerSonuc += "<tr><td>";
                                  birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                    $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td></tr>");
                                }
                                else{
                                  birlesikSozlerSonuc += "<td>";
                                  birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                    $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td>");
                                }
                              }
                              else if($( window ).width() > 1080 && $( window ).width() < 1280){
                                if(birsonuc % 6 == 0){
                                  birlesikSozlerSonuc += "<tr><td>";
                                  birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                    $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td></tr>");
                                }
                                else{
                                  birlesikSozlerSonuc += "<td>";
                                  birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                    $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td>");
                                }
                              }
                              else{
                                if(birsonuc % 7 == 0){
                                  birlesikSozlerSonuc += "<tr><td>";
                                  birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                    $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td></tr>");
                                }
                                else{
                                  birlesikSozlerSonuc += "<td>";
                                  birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                    $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td>");
                                }
                              }


                            }
                            birlesikSozlerSonuc += "</tbody></table>"
                          }
                          sesGetirelim(resp.madde,value,sonuc);
                          }
                        }
                    }
             }
          )
          .fail(function(e) {

              $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
          });
      }

  });

  $(document).ready(function(){
            $.ajax({
                url: 'https://sozluk.gov.tr/icerik' ,
                dataType: 'json',
                type: 'get',
                success: function( data, textStatus, jQxhr ){

          for(let i in data.karistirma){
              resp = data.karistirma[i];
                  $('.sks' + i).html('<strong >' + resp.yanlis + '</strong>');
                  $('.sks' + i +'0').html('<strong >' + resp.dogru + '</strong>');
                }

            for(let i in data.atasoz){
                let resp = data.atasoz[i];
                $('#tur' + i).html('Bir Deyim-Atasözü');
                $('#tur' + i).css('color','red').css('font-size','18px');
                $('.atasoz' + i).html(resp.madde);
                $('.atasoz' + i ).css('color','#cd853f').css('font-weight','bolder');
                $('.atasozAnlam' + i).html(resp.anlam + '.').css('color','black');
            }

            $('#syyd span table').append('<tr id=row-2' + ' ></tr>' );
            $('#row-2').append('<th id=column-2'  + ' value=-1 style="font-size:16px;" ></th>');
            for(let i in data.syyd){
                let resp = data.syyd[i];
                $('#syyd span table').append('<tr id=rowid' + i + ' ></tr>' );
                $('#rowid' + i).append('<td id=columnid' + i + ' style="text-align:left;"  value=' + i + '></td>');
                if($( window ).width() < 992){
                  $('#columnid' + i).append('<div><p id=yanlis' + i + ' style=color:#ec4473;font-size:16px></p></div><div><p id=dogru' + i + ' style=color:#2cc3bd;font-size:16px;></p></div>');
                }
                else{
                  $('#columnid' + i).append('<div><p id=yanlis' + i + ' style=color:#ec4473;font-size:18px;></p></div><div><p id=dogru' + i + ' style=color:#2cc3bd;font-size:18px;></p></div>');
                }
                $('#yanlis' + i).html('<span class="glyphicon glyphicon-remove"></span><strong style=margin-left:20px>' + resp.yanliskelime +  '</strong>');
                $('#dogru' + i).html('<span class="glyphicon glyphicon-ok"></span><strong style=margin-left:20px>' + resp.dogrukelime +  '</strong>');
            }

            $('#kelime span table').append('<tr id=row-1' + ' ></tr>' );
            $('#row-1').append('<th id=column-1'  + ' value=-1 ></th>');
            $('#column-1').html('<strong style=color:#cd853f;font-size:18px;>' + data.kelime[0].madde +  '</strong>');
            for(let i in data.kelime){
                let resp = data.kelime[i];
                $('#kelime span table').append('<tr id=row' + i + ' ></tr>' );
                $('#row' + i).append('<td id=column' + i + ' style="text-align:left;font-size:17px;color:black !important"  value=' + i + '></td>');
                $('#column' + i).html(resp.anlam + ".");
            }

            $('#kural span p a').html('<strong style=color:#2cc3bd;font-size:20px;>' + data.kural[0].adi +  '</strong>');
            $('#kural span p a').attr("href",data.kural[0].url);
  }
  });
  });

function alanlariTemizle() {
     $( ".hangisozluk" ).remove();
     $( ".bulunan" ).remove();
     $( ".ozellikler" ).remove();
     $( ".lead" ).remove();
      $( ".maddeler" ).remove();
     $( ".eszitAnlam" ).remove();
     $( ".birlesikSozler" ).remove();
     $( ".isaretDili" ).remove();

};

let gtsbyId = false;
let gtsId=0;
let anaSoz="";
let atadeyim=false;
let isGts=false;
function bunumuDemek(bu,val) {
  if(val === 0){
    $(':checkbox:checked').not($('li input[value=gts]:checkbox')).prop('checked',false);
  }
  else{
    $(':checkbox:checked').prop('checked',false);
    gtsbyId = true;
    gtsId = val;
  }
      if(atadeyim){
        atadeyim=true;
      }
      else {
        anaSoz=$('#tdk-srch-input').val();
        atadeyim=true;
      }

    $('#tdk-srch-input').val(bu);

    $("#tdk-srch-form").submit();
    isGts=false;
};

$(document).ready(function(e) {
    $(document).on('click','.oneriler',function(){
      if($(this).attr("value") === "0"){
        bunumuDemek($(this).text(),0);
      }
      else{
        bunumuDemek($(this).text(),$(this).attr("value"));
      }
    });
});

$(document).ready(function(e) {
  $(document).on('click','.onerilerLink',function(){
    $('#tdk-srch-input').val($(this).text());
    $("#tdk-srch-form").submit();
  });
});

$(document).ready(function(e) {
    $(document).on('click','.onerilerKas',function(){
        $(':checkbox:checked').not($('li input[value=kisiAd]:checkbox')).prop('checked',false);
        $('li input[value=kisiAd]:checkbox').prop('checked',true);
          $('#kisiAd0 ol input[value=4]:checkbox').prop('checked',true);
            $('#kisiAd0>input').attr('disabled',false);
              $('#kisiAnlam0 ol').css('display','none');
          $('#kisiAnlam0>input').attr('disabled',true);
      $('#tdk-srch-input').val($(this).text());
      $("#tdk-srch-form").submit();
    });
});


function geriDon(){
  $('#tdk-srch-input').val(anaSoz);
  $("#tdk-srch-form").submit();
  isGts=true;
}

function geriDonAtaDeyim(){
  $('#tdk-srch-input').val(anaSoz);
  $("#tdk-srch-form").submit();
    isGts=true;
}

let checkedLehce="";
$(document).ready(function() {
    $('#lehceler li input[type=checkbox]').click(function(){

      if($("#lehceler li input[type=checkbox]").is(':checked')){
        $("#lehceler li input[type=checkbox]:not(:checked)").attr("disabled", true);
        checkedLehce = $("#lehceler li input[type=checkbox]:checked").parent().val();
      }
      else {
        $("#lehceler li input[type=checkbox]:not(:checked)").attr("disabled", false);
      }
  });
});

function romanize (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const seskoda = a.seskod;
  const  seskodb = b.seskod;

  let comparison = 0;
  if (seskoda > seskodb) {
    comparison = 1;
  } else if (seskoda < seskodb) {
    comparison = -1;
  }
  return comparison;
}

var eskiSoz=""
function sesGetirelim(soz,value,sonuc) {

  if(eskiSoz !== soz && sonuc == 0){
    eskiSoz = soz
  }
  else{
    return;
  }
  let temp = ""
  temp = soz
  if(/I/.test(temp)){
    temp = temp.replace('I','ı');
  }
  else if(/İ/.test(temp)){
    temp = temp.trim().replace('İ','i');
  }
  else if(/Â/.test(temp)) {
      temp = temp.trim().replace('Â','â');
  }
  if(/Ş/.test(temp) || /Ü/.test(temp) || /Ö/.test(temp) || /Ğ/.test(temp) || /Ç/.test(temp)){
    temp = temp.toLowerCase();
  }
    let deg = encodeURI(temp);
    $.ajax({
        url: 'https://sozluk.gov.tr/yazim?ara=' + deg ,
        dataType: 'json',
        type: 'get',
        success: function( data, textStatus, jQxhr ){
         if(!data.error)  {
             for (let i in data) {

                   if ( (data[i].sozu.trim() == soz ) && (data[i].seskod != undefined && data[i].seskod !== "")) {
                     $('#bulunan-' + value + sonuc).append("<a class=sesGetir onclick=this.firstElementChild.play();><audio src=/ses/"
                                   + data[i].seskod + ".wav></audio></a>");
                   }
                   else if(data[i].sozu.trim() != ""){
                     $('#bulunan-' + value + sonuc).append("<a class=sesGetir onclick=this.firstElementChild.play();><audio src=/ses/"
                                   + data[i].seskod + ".wav></audio></a>");
                   }
                   if((data.length - 1) !== i){
                     sonuc++;
                   }
               }
           }
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
};

function taramaImg(resp,index,value,sonuc) {

  $.ajax({
    url: 'https://sozluk.gov.tr/taramaId?id=' + resp.kelime_id ,
    dataType: 'json',
    type: 'get',
    success: function( data, textStatus, jQxhr ){
     if(!data.error)  {
      $("#maddeler" + index).append("<div id=hangisozluk-" + value + sonuc + " class=lead ></div>");
      $("#maddeler" + index).append("<div id=bulunan-" + value + sonuc + " class=bulunan style=color:blue;font-weight:bolder;margin-bottom:30px></div>");
      $("#maddeler" + index).append("<div id=ozellikler-" + value + sonuc + " class=ozellikler ></div>");
      $("#maddeler" + index).append("<div id=anlamlar-" + value + sonuc + " class=lead style=color:black !important></div>");
      
      $('#bulunan-'+ value + sonuc).append(resp.kelime);
      var ozellikler="", anlamlar="";

      anlamlar = "<span class=lead style=font-weight:bolder;font-size:20px;>" +
       resp.anlam +
       "</span>";

      $('#ozellikler-' + value + sonuc).append(ozellikler);
      $('#anlamlar-' + value + sonuc).append(anlamlar);
        if(data.resim !== ""){
          if(data.resim.split(" ").length > 0){
            for(let i in data.resim.split(" ")) {
              $("#maddeler" + index).append("<img id=" + value + sonuc + "  src=/dosyalar/tarornek/" +  data.resim.split(" ")[i] + ".gif style=width:380px;height:auto></img>");
            }
          }
          else
          $("#maddeler" + index).append("<img id=" + value + sonuc + " src=/dosyalar/tarornek/" +  data.resim + ".gif  style=width:380px;height:auto></img>");
        }
      }
    },
    error: function( jqXhr, textStatus, errorThrown ){
        console.log( errorThrown );
    }
});
}

function parmaklar(neresi,basla,soz) {
    var harf = basla;
    var icersi = '<div class="isaret-sar"><table><tbody><tr>';
    var sozDizi=null;
    sozDizi = soz.split('');
    if (/â/.test(soz)) {
        soz="";
        for(let i=0; i < sozDizi.length ; i++){
          if(sozDizi[i] == "İ"){
            sozDizi[i] = "i" ;
          }
          if("â" == sozDizi[i]){
               sozDizi[i]="a";
            }
            soz += sozDizi[i] ;
        }
    }
    else if(/î/.test(soz)){
      soz="";
      for(let i=0; i < sozDizi.length ; i++){
          if(sozDizi[i] == "İ"){
            sozDizi[i] = "i" ;
          }
          if("î" == sozDizi[i]){
             sozDizi[i]="i";
          }
          soz += sozDizi[i] ;
      }
    }
    else if(/û/.test(soz)){
      soz="";
      for(let i=0; i < sozDizi.length ; i++){
        if(sozDizi[i] == "İ"){
          sozDizi[i] = "i" ;
        }
          if("û" == sozDizi[i]){
             sozDizi[i]="u";
          }
        soz += sozDizi[i] ;
      }
    }
    while (basla < soz.length) {

      if(soz[basla] === " " || soz[basla] === "(" || soz[basla] === ")" || soz[basla] === "?" || soz[basla] === ","
      || soz[basla] === "!" || soz[basla] === "'" || soz[basla] === "." || soz[basla] === "-" || soz[basla] === "\""){
        soz[basla++] ;
        icersi += '<td> </td>';
      }
      else{
          icersi += '<td><img src="/assets/img/isaret/' + soz[basla++].toLowerCase() + '.gif " class="no-resp-img"></td>';
      }

    }
    icersi += '</tr><tr>';
    while (harf < soz.length) {
        icersi += '<td>' + soz[harf++] + '</td>';
    }
    icersi += '</tr></tbody></table></div>';
    $(neresi).append(icersi);
}

function doSet(itemOut){
      $("#tdk-srch-input").val($(itemOut).text());
  }

  $(document).ready(function() {
    $.ajax({
        url: 'https://sozluk.gov.tr/terim?terim' ,
        dataType: 'json',
        type: 'get',
        success: function( data, textStatus, jQxhr ){
            if  (!data.error)  {
              $('#bst li[value=-1]').append('<span style=color:red> Tümünde Ara</span>');
              for (let resp in data) {
                if(data[resp].id == 17 || data[resp].id == 28 || data[resp].id == 50){
                    let l = data[resp].eser_ad.indexOf('(');
                    let v = data[resp].eser_ad.indexOf(')');
                    data[resp].eser_ad = data[resp].eser_ad.slice(0,(l-1));
                }

                if(data[resp].yaytar === null || data[resp].yaytar === "" || data[resp].yaytar === ''){
                  $('#bst li[value=' + resp + ']').append('<span> ' + data[resp].eser_ad + '</span>');
                }
                else
                  $('#bst li[value=' + resp + ']').append('<span> ' + data[resp].eser_ad + ' - ' + data[resp].yaytar + '</span>');
                }

            }
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
  });
  $(document).ready(function() {
    $('#bst li[value=-1]').click(function(){
        if($('#bst li[value=-1] input').is(':checked')){
         $('#bst li input[type=checkbox]:not(:checked)').prop("checked", true);
        }
       else{
         $('#bst li input[type=checkbox]:checked').prop("checked", false);
         if(!$('#kisiAdlariSoz li input:checkbox,#ads,#bati,#ysk, #lehceler li input:checkbox,#iets,#hs,#ums,#ts,#ds,#bst li input:checkbox,#bst li[value=-1] input:checkbox').is(':checked')){
             $('#tdk-srch-input').attr("placeholder", "Güncel Türkçe Sözlük'te Ara");
         }
       }
  });
  });
  $(document).ready(function() {
    $('#bst li').not('#bst li[value=-1]').click(function(){
        if($('#bst li[value=-1] input').is(':checked')){
         $('#bst li[value=-1] input').prop("checked", false);
        }
  });
  });

let autocmpSelected=false;
let autocmpObj = [];
let autocmpObjSapka = [];
let autocmpObjSapkaKeys=[];
$(document).ready(function () {

  $.ajax({
    url:'https://sozluk.gov.tr/autocomplete.json',
    method:"GET",
    dataType: 'json',
    success:function(data)
    {
      if(data.length > 0){

        autocmpObj = data;
      }
    },
    error:function(jqXhr, textStatus, errorThrown ){
        console.log( errorThrown );
    }
  });
  });
  $(document).ready(function () {
    $.ajax({
      url:'/assets/js/autocompleteSapka.json',
      method:"GET",
      dataType: 'json',
      success:function(data)
      {
        if(data.length > 0){
          autocmpObjSapka = data;
        }
      },
      error:function(jqXhr, textStatus, errorThrown ){
          console.log( errorThrown );
      }
    });
    });
$(document).ready(function () {
        $("#tdk-srch-input").keyup(function(e){
          let query = $.trim($(this).val());
          if(/I/.test($(this).val())){
            query = $(this).val().trim().replace('I','ı');
          }
          else if(/İ/.test($(this).val())){
            query = $(this).val().trim().replace('İ','i');
          }
        let itemOut=null;
        let deg = "";
        if(/Ş/.test(query) || /Ü/.test(query) || /Ö/.test(query) || /Ğ/.test(query) || /Ç/.test(query)){
            deg = encodeURI(query.toLowerCase());
        }
        else {
            deg= encodeURI(query);
        }

        if(query.length > 2 && $('input[value=gts]:checkbox:checked').length !== 0 && autocmpSelected == false && e.which !== 13){

          $('.autocmp').fadeIn();
            $(".autocmp").empty();
            const regex = new RegExp(query.trim(), 'i');
            let x=0;
            let sapkaObj=[]
            let sapkaObj2=[]
            let sapkaObj3=[]

            if(!/trident/i.test(M[1])){

               autocmpObj.some(function(item,key){
                if(x > 7){
                      return false;
                }
                if(x == 0 && item.madde.search(regex) == 0){
                  $(".autocmp").append("<div class='line selected' value='" + x + "' "  + ">" + "<b>" + item.madde + "</b>" + "</div>");
                  x++;
                }
                else if(x !== 0 && item.madde.search(regex) == 0){
                  $(".autocmp").append("<div class='line' value='" + x + "' "  + ">" + "<b>" + item.madde + "</b>" + "</div>");
                  x++;
                }
              });
              
              for (let i = 0; i < Object.keys(autocmpObjSapka[0]).length; i++) {
                sapkaObj.push({madde:Object.keys(autocmpObjSapka[0])[i]})
              }
              
              sapkaObj2 = sapkaObj.filter(function(item,key){
              if(item.madde.search(regex) == 0){
                return item
              }
              });
             
              for (let j = 0; j < sapkaObj2.length; j++) {
                sapkaObj3.push(autocmpObjSapka[0][sapkaObj2[j].madde])
               }

               sapkaObj3.some(function(item,key){
                if(x > 19){
                      return false;
                }
                  $(".autocmp").append("<div class='line' value='" + x + "' "  + ">" + "<b>" + item + "</b>" + "</div>");
                  x++;
              });
            }
            else{
              autocmpObj.some(function(item,key){
                if(x > 9){
                      return false;
                }
                if(x == 0 && item.madde.search(regex) == 0){
                  $(".autocmp").append("<div class='line selected' value='" + x + "' "  + ">" + "<b>" + item.madde + "</b>" + "</div>");
                  x++;
                }
                else if(x !== 0 && item.madde.search(regex) == 0){
                  $(".autocmp").append("<div class='line' value='" + x + "' "  + ">" + "<b>" + item.madde + "</b>" + "</div>");
                  x++;
                }
              });
            }

            $(".autocmp div").bind("click",function(){
              doSet(this);
              $('#tdk-srch-form').submit();
              $('.autocmp').hide();
              $('.autocmp').fadeOut();
              $(".autocmp").empty();
              autocmpSelected=false;
            });
              }
          else if (query.length <= 2){
            $(".autocmp").empty();
            $('.autocmp').fadeOut();
            queryEski="";
            }
          });
            $("#tdk-srch-input").keydown(function(e) {
                switch (e.which) {
                case 40:
                  e.preventDefault();
                  if($('.autocmp > span').length > 1){
                    $('div:not(:last-child).selected').removeClass('selected')
                    .next().addClass('selected');
                  }
                  else{
                    $('div:not(:last-child).selected').removeClass('selected').css('display','none')
                    .next().addClass('selected');
                  }
                    doSet($('div.selected'));
                    autocmpSelected=true;
                  break;
                case 38:
                  e.preventDefault(); // prevent moving the cursor
                  if($('.autocmp > span').length > 1){
                    $('div:not(:first-child).selected').removeClass('selected')
                    .prev().addClass('selected');
                  }
                  else{
                    $('div:not(:first-child).selected').removeClass('selected')
                    .prev().addClass('selected').css('display','block');
                  }
                    doSet($('div.selected'));
                    autocmpSelected=true;
                  break;
                  default:
                    autocmpSelected=false;
                    break;
                }
            });
});
let sozluklerIsChanged=false;
$(document).ready(function () {
  $('input:checkbox').click(function(){
    sozluklerIsChanged=true;
  });
});
$(document).ready(function () {
  $('#tdk-search-btn').click(function(){

    $('.tdk-search-mm.open').removeClass('open');
  });
});
let sozluklerLengthYeni=0;
let sozluklerLengthEski=0;
$(document).ready(function () {

  $('#tdk-srch-form').submit( function(e) {
   
    autocmpSelected=false;
    $('.autocmp').fadeOut();
    $(".autocmp div").remove();

    let sozlukler = [];
    $(':checkbox:checked').not($('#bst li input[type=checkbox]:checked')).each(function(i){
        sozlukler[i] = $(this).val();
    });
     if($('#bst li input[value=bst]:checked').length > 0){
        sozlukler[sozlukler.length] = "bst";
     }
     if($('#bst li input[value=hs]').is(':checked')){
       sozlukler[sozlukler.length] = "hs";
     }
     if($('#bst li input[value=iets]').is(':checked')){
       sozlukler[sozlukler.length] = "iets";
     }
     if($('#bst li input[value=ums]').is(':checked')){
       sozlukler[sozlukler.length] = "ums";
     }
     if(gtsbyId){
       sozlukler[0] = "gtsbyId";
     }


    sozluklerLengthYeni = sozlukler.length;
    if($('#aranan').val() != undefined && $('#aranan').val() != null && ($('#aranan').val() != $('#tdk-srch-input').val()
    || sozlukler.length !==  sozluklerLengthEski || sozluklerIsChanged || gtsbyId)){
      sozluklerLengthEski = sozluklerLengthYeni;
    }
    else{
      return false;
    }
    sozluklerIsChanged = false;
    $('#aranan').val($('#tdk-srch-input').val());
    

        if( $('#tdk-srch-input').val() === "" ) {
          // $(".autocmp").append("<div id=emptyTxt class=line value=-1 style=color:red;font-size:20px;font-weight:bolder></div>");
          // $('#emptyTxt').append('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Hata : </span>');
          //   $("#emptyTxt span").html('&nbsp;En az bir harf giriniz...');
          //   $(".autocmp").fadeIn(500);
          //   $(".autocmp").fadeOut(10000);
            return false;
        }
        if ( $(":checkbox:checked").length == 0 && gtsbyId == false) {
          $("#buSoz").remove();
          $("#bosluk1").remove();
          $("#oneriBasl").remove();
          $("#bosluk2").remove();
          $(".autocmp").append("<div id=emptyTxt class=line value=-1 style=color:red;font-size:20px;font-weight:bolder></div>");
          $('#emptyTxt').append('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true">&nbsp;&nbsp;</span><span class="sr-only"> Hata : </span>');
          $("#emptyTxt span").html('&nbsp;En az bir sözlükte arayınız...');
          $(".autocmp").css('display','block');
          return false;
        }
        
        alanlariTemizle();


        let isUms = false;

        $.each( sozlukler, function( index, value ) {
            switch (value) {
                case 'gts'://güncel türkçe sözlük
                 
                  let vlu=$('#aranan').val().trim();
                  if(/I/.test($('#aranan').val())){
                    vlu = $('#aranan').val().trim().replace('I','ı');
                  }
                  else if(/İ/.test($('#aranan').val())){
                    vlu = $('#aranan').val().trim().replace('İ','i');
                  }
                  else if(/Â/.test($('#aranan').val())) {
                      vlu = $('#aranan').val().trim().replace('Â','â');
                  }
                  let deg="";
                  if(/Ş/.test($('#aranan').val()) ||
                   /Ü/.test($('#aranan').val()) || /Ö/.test($('#aranan').val()) || /Ğ/.test($('#aranan').val()) || /Ç/.test($('#aranan').val())){
                      deg = encodeURI(vlu.toLowerCase());
                  }
                  else {
                     deg = encodeURI(vlu.toLowerCase());
                  }

                  $.ajax({
                          url: 'https://sozluk.gov.tr/gts?ara=' + deg,
                          dataType: 'json',
                          type: 'get',
                          success: function( data, textStatus, jQxhr ){

                            let sapkaVarmi=false;
                            if(data != null){
                            for(let p=0 ; p < data.length; p++){
                              if(/â/.test(data[p].madde) || /î/.test(data[p].madde) || /û/.test(data[p].madde)){
                                  sapkaVarmi=true;
                              }
                            }
                          }
                            if ( (data.error)){
                              if(sozlukler[0] === "gts" && sozlukler.length === 1 )
                              $('#maddeleri-sar').css('display','none');
                                $.ajax({
                                  url: 'https://sozluk.gov.tr/oneri?soz=' + deg,
                                  dataType: 'json',
                                  type: 'get',
                                  success: function( data, textStatus, jQxhr ){
                                    if(data.length > 0){
                                          $(".autocmp").css('display','block');
                                          $("#buSoz").remove();
                                          $("#bosluk1").remove();
                                          $("#oneriBasl").remove();
                                          $("#bosluk2").remove();
                                          $(".autocmp").append("<span id=buSoz style=display:block;color:red class='line' value='" + 0 + "' "  + ">" + "<b>Bu söz Güncel Türkçe Sözlük'te bulunamadı.</b>" + "</span>");
                                          $(".autocmp").append("<span id=bosluk1 style=display:block class='line' value='" + 1 + "' "  + "></span>");
                                          $(".autocmp").append("<span id=oneriBasl style=display:block;color:blue class='line' value='" + 2 + "' "  + ">" + "<b>Öneriler</b>" + "</span>");
                                          $(".autocmp").append("<span id=bosluk2 style=display:block class='line' value='" + 3 + "' "  + "></span>");

                                      for (let key in data) {
                                        if(key == 0)
                                          $(".autocmp").append("<div class='line selected' value='" + key + "' "  + ">" + "<b>" + data[key].madde + "</b>" + "</div>");
                                        else
                                          $(".autocmp").append("<div class='line' value='" + key + "' "  + ">" + "<b>" + data[key].madde + "</b>" + "</div>");
                                        }

                                          $(".autocmp div").bind("click",function(){
                                            doSet(this);
                                            $('#tdk-srch-form').submit();
                                            $('.autocmp').hide();
                                            $('.autocmp').fadeOut();
                                            $(".autocmp").empty();
                                            autocmpSelected=false;
                                          });
                                    }
                                    else{
                                      $('#maddeleri-sar').css('display','block');
                                      $("#maddeleri-sar").prepend("<div id=maddeler" + index + " class=lead ></div>");
                                    $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=hangisozluk style='color:red;text-align:center;padding-bottom:1em'></div>");
                                    $('#hangisozluk-' + value ).append("<b>Güncel Türkçe Sözlük</b>".toUpperCase());
                                    $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=lead style=font-weight:bolder;color:red >Bu söz bulunamadı.</div>");
                                      return false;
                                    }
                                  },
                                  error: function(error){
            
                                  }
                                });
                                return false;
                            }
                            else if (!data.error) {

                              document.getElementsByTagName('meta')[8].content = data[0].madde + " ne demek TDK Sözlük Anlamı" || "Türk Dil Kurumuna Ait Tüm Sözlükler";
                              document.getElementsByTagName('meta')[7].content = data[0].madde + " ne demek TDK Sözlük Anlamı" || "Türk Dil Kurumu | Sözlük";
                              document.getElementsByTagName('meta')[6].content = "https://sozluk.gov.tr/?kelime=" + data[0].madde;
                              document.getElementsByTagName('meta')[1].content = data[0].madde + " ne demek TDK Sözlük Anlamı";
                              document.title = data[0].madde + " ne demek TDK Sözlük Anlamı";

                              $('#maddeleri-sar').css('display','block');
                              $("#maddeleri-sar").prepend("<div id=maddeler" + index + " class=lead ></div>");
                            $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=hangisozluk style='color:red;text-align:center;padding-bottom:1em'></div>");
                            $('#hangisozluk-' + value ).append("<b>Güncel Türkçe Sözlük</b>".toUpperCase());
                            $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=lead style=font-weight:bolder ></div>");

                              if(data !== null && data !== undefined && data.error === undefined ){
                                data.sort(function(a,b){
                                  let x = false;
                                  let y = false;
                                  if (/â/.test(a.madde) || /î/.test(a.madde) || /û/.test(a.madde)) {
                                      x = true;
                                  }
                                  else if(/â/.test(b.madde) || /î/.test(b.madde) || /û/.test(b.madde)) {
                                      y = true;
                                  }
                                  if(x == true && y ==false){
                                    if(a.madde_id < b.madde_id)
                                    return b.madde_id - a.madde_id;
                                    else
                                    return a.madde_id - b.madde_id;
                                  }
                                  else if(y == true && x==false){
                                    if(b.madde_id < a.madde_id)
                                    return b.madde_id - a.madde_id;
                                    else
                                    return a.madde_id - b.madde_id;
                                  }
                                  else {
                                    return null;
                                  }
                                });
                              }

                              let birSapkasiz = 0;
                              let birSapkasizBirdenCokSapkali = 0;
                              let birSapkasizBirdenCokSapkaliMi = false;
                              data !== undefined ?
                              data.some(function(item) {
                                  if(!(/Â/.test(item.madde) || /â/.test(item.madde) || /î/.test(item.madde) || /û/.test(item.madde))){
                                      birSapkasiz += 1
                                  }
                                  else{
                                    birSapkasizBirdenCokSapkali += 1
                                  }
                                }) : ""
                                if(birSapkasiz === 1 && birSapkasizBirdenCokSapkali > 1){
                                  birSapkasizBirdenCokSapkaliMi = true
                                }

                            //en az bir sonuç var
                                $("#isaretDili").css('margin-bottom','20px').css('font-size',16);
                                $("#isaretDili").append("<div id=isaretSoz class=maddeler ></div>");
                                $("#isaretSoz").append("<div id=isaretSozluk class=hangisozluk style=color:black !important;></div>");
                                $("#isaretSozluk").html("Türk İşaret Dili <br> Parmak Alfabesiyle Gösterilişi");
                                $("#isaretSoz").append("<div id=isaretBulunan class=isaretBulunan style=color:black !important></div>");
                                $("#isaretSoz").append(" <hr class=hr-primary />");
                                let vle = $('#aranan').val();
                                if(/I/.test($('#aranan').val())){
                                  vle = $('#aranan').val().replace('I','ı');
                                }
                                else if(/İ/.test($('#aranan').val())){
                                  vle = $('#aranan').val().replace('İ','i');
                                }
                                parmaklar('#isaretBulunan',0,vle.trim().toLowerCase());
                                let ozel=true;
                                data.some(function(item){
                                    if(item.ozel_mi === "0"){
                                        ozel=false;
                                    }
                                  });

                                for (var sonuc in data) {
                                    var sapkali = false;
                                    var roman = sonuc;
                                    roman++;
                                    $("#maddeler" + index).append("<div id=bulunan-" + value + sonuc + " class=lead style=font-size:40px;font-weight:bolder;color:blue></div>");
                                    $("#maddeler" + index).append("<div id=ozellikler-" + value + sonuc + " class=lead style=font-size:20px;font-weight:bolder;color:orange !important></div>");
                                    $("#maddeler" + index).append("<div id=anlamlar-" + value + sonuc + " class=lead style=font-size:20px;color:black !important></div>");

                                    if(atadeyim && !isGts){
                                      $("#maddeler" + index).append('<button id=geriBirlesik class=btn onclick=geriDon()></button>');
                                      $('#geriBirlesik').html('<span class="glyphicon glyphicon-chevron-left" style=color:white></span><strong style=margin-left:10px;font-size:15px>' + anaSoz + '</strong>');
                                    }
                                    atadeyim=false;

                                    var resp = data[sonuc];
                                      if((resp.birlesikler !== undefined && resp.birlesikler !== null) && resp.atasozu !== undefined) {
                                      $("#maddeler" + index).append("<div class=accordion id=accordionExample-" + value + sonuc + ">"
                                      +  " <div class=card>"
                                      + " <div class=card-header id=headingOne>"
                                      + " <h5 class=mb-0>"
                                      + " <button class=btn btn-link type=button data-toggle=collapse data-target=#ataSozler-" + value + sonuc + " aria-expanded=true aria-controls=ataSozler>"
                                      + " <strong style=padding:5px;font-size:15px>Atasözleri, Deyimler veya Birleşik Fiiller</strong>"
                                      + " </button>"
                                      + " </h5>"
                                      + " </div>"
                                      + " <div id=ataSozler-" + value + sonuc + " class=collapse aria-labelledby=headingTwo data-parent=#accordionExample-" + value + sonuc + ">"
                                      + " <div id=ataSoz-" + value + sonuc + " class=card-body ataSoz-" + value + sonuc + ">"
                                      + " </div>"
                                      + " </div>"
                                      + " </div>"
                                      + " <div class=card>"
                                      + " <div class=card-header id=headingTwo>"
                                      + " <h5 class=mb-0>"
                                      + " <button class=btn btn-link collapsed type=button data-toggle=collapse data-target=#birlesikler-" + value + sonuc
                                      + "  aria-expanded=false aria-controls=collapseTwo>"
                                      + " <strong style=padding:5px;font-size:15px>Birleşik Kelimeler</strong>"
                                      + " </button>"
                                      + " </h5>"
                                      + " </div>"
                                      + " <div id=birlesikler-" + value + sonuc + " class=collapse aria-labelledby=headingTwo data-parent=#accordionExample-" + value + sonuc + ">"
                                      + " <div id=birlesik-" + value + sonuc + " class=card-body birlesik-" + value + sonuc + ">"
                                      + " </div>"
                                      + " </div>"
                                      + " </div>"
                                      + "</div>");
                                     }
                                     else if(resp.atasozu !== undefined){
                                       $("#maddeler" + index).append("<div class=accordion id=accordionExample-" + value + sonuc + ">"
                                       +  " <div class=card>"
                                       + " <div class=card-header id=headingOne>"
                                       + " <h5 class=mb-0>"
                                       + " <button class=btn btn-link type=button data-toggle=collapse data-target=#ataSozler-" + value + sonuc + " aria-expanded=true aria-controls=ataSozler>"
                                       + " <strong style=padding:5px;font-size:15px>Atasözleri, Deyimler veya Birleşik Fiiller</strong>"
                                       + " </button>"
                                       + " </h5>"
                                       + " </div>"
                                       + " <div id=ataSozler-" + value + sonuc + " class=collapse aria-labelledby=headingTwo data-parent=#accordionExample-" + value + sonuc + ">"
                                       + " <div id=ataSoz-" + value + sonuc + " class=card-body ataSoz-" + value + sonuc + ">"
                                       + " </div>"
                                       + " </div>"
                                       + " </div>"
                                       + "</div>");
                                     }
                                     else if(resp.birlesikler !== undefined && resp.birlesikler !== null){
                                       $("#maddeler" + index).append("<div class=accordion id=accordionExample-" + value + sonuc + ">"
                                       + " <div class=card>"
                                       + " <div class=card-header id=headingTwo>"
                                       + " <h5 class=mb-0>"
                                       + " <button class=btn btn-link collapsed type=button data-toggle=collapse data-target=#birlesikler-" + value + sonuc
                                       + "  aria-expanded=false aria-controls=collapseTwo>"
                                       + " <strong style=padding:5px;font-size:15px>Birleşik Kelimeler</strong>"
                                       + " </button>"
                                       + " </h5>"
                                       + " </div>"
                                       + " <div id=birlesikler-" + value + sonuc + " class=collapse aria-labelledby=headingTwo data-parent=#accordionExample-" + value + sonuc + ">"
                                       + " <div id=birlesik-" + value + sonuc + " class=card-body birlesik-" + value + sonuc + ">"
                                       + " </div>"
                                       + " </div>"
                                       + " </div>"
                                       + "</div>");
                                     }

                                    $("#ozellikler-" + value + sonuc).append(ozelliklerP);

                                    if(/â/.test(resp.madde) || /î/.test(resp.madde) || /û/.test(resp.madde)){
                                        sapkali=true;
                                    }

                                    if(resp.on_taki != null){
                                       resp.madde = resp.on_taki + resp.madde;
                                    }

                                    if(sapkali){

                                      if(resp.taki !== null){
                                        $('#bulunan-' + value + sonuc).append(resp.madde + ", <span>  -" + resp.taki + "</span>");
                                      }
                                      else{
                                        $('#bulunan-' + value + sonuc).append(resp.madde);
                                      }
                                    }
                                    else{
                                    if(resp.ozel_mi === "0" && data.length > 1 && data.length !=2 && birSapkasizBirdenCokSapkaliMi === false){
                                      if(resp.taki !== null){
                                        $('#bulunan-' + value + sonuc).append(resp.madde   + ", <span>  -" + resp.taki + "</span>" + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>');
                                      }
                                      else{
                                        $('#bulunan-' + value + sonuc).append(resp.madde + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>' );
                                      }
                                    }
                                    else if(data.length == 1){
                                      if(resp.taki !== null){
                                        $('#bulunan-' + value + sonuc).append(resp.madde + ", <span>  -" + resp.taki + "</span>");
                                      }
                                      else{
                                        $('#bulunan-' + value + sonuc).append(resp.madde);
                                      }
                                    }
                                    else{
                                      let salMi = data.filter(function(item) { return item.ozel_mi === "1" }) ;
                                      if(salMi.length > 0){
                                       if(data.length > 1 && ozel && birSapkasizBirdenCokSapkaliMi === false){
                                          if(resp.taki !== null){
                                            $('#bulunan-' + value + sonuc).append(resp.madde   + ", <span>  -" + resp.taki + "</span>" + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>');
                                          }
                                          else{
                                            $('#bulunan-' + value + sonuc).append(resp.madde + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>' );
                                          }
                                        }
                                        else {
                                          if(resp.taki !== null){
                                            $('#bulunan-' + value + sonuc).append(resp.madde + ", <span>  -" + resp.taki + "</span>");
                                          }
                                          else{
                                            $('#bulunan-' + value + sonuc).append(resp.madde);
                                          }
                                        }

                                      }
                                      else if(data.length != 2 && birSapkasizBirdenCokSapkaliMi === false){
                                        if(resp.taki !== null){
                                          $('#bulunan-' + value + sonuc).append(resp.madde   + ", <span>  -" + resp.taki + "</span>" + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>');
                                        }
                                        else{
                                          $('#bulunan-' + value + sonuc).append(resp.madde + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>' );
                                        }
                                      }
                                      else if(data.length == 2 && !sapkaVarmi && birSapkasizBirdenCokSapkaliMi === false){
                                        if(resp.taki !== null){
                                          $('#bulunan-' + value + sonuc).append(resp.madde   + ", <span>  -" + resp.taki + "</span>" + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>');
                                        }
                                        else{
                                          $('#bulunan-' + value + sonuc).append(resp.madde + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>' );
                                        }
                                      }
                                      else{
                                        if(resp.taki !== null){
                                          $('#bulunan-' + value + sonuc).append(resp.madde + ", <span>  -" + resp.taki + "</span>");
                                        }
                                        else{
                                          $('#bulunan-' + value + sonuc).append(resp.madde);
                                        }
                                      }

                                    }
                                  }

                                    var ozellikler="",ornekler="",
                                        anlamlar="",anlamlarP="",
                                        ozelliklerP="<i>",bilesiklerP="",
                                        birlesikSozlerSonuc="",ilkAnlamTur=0,
                                        ilkAnlamTamAdi="",ilkAnlamTamAdiBosliste="",
                                        ikinciAnlamTur3=[],ilkAnlamTamAdi4="",
                                        i,j,k,l;


                                            for (i in resp.anlamlarListe) {
                                              if(resp.anlamlarListe[i].ozelliklerListe !== undefined){
                                                ikinciAnlamTur3 = resp.anlamlarListe[i].ozelliklerListe.filter(function(item){
                                                    return item.tur === "3";
                                                });
                                              }

                                              if(/343/.test(resp.anlamlarListe[i].anlam)){
                                                  resp.anlamlarListe[i].anlam = resp.anlamlarListe[i].anlam.replace(/[^a-zA-ZıüöçğşÇĞŞâîûİÖÜÂÛÎ @]+/g, "<i>bakınız </i>");
                                              }
                                                anlamlar += resp.anlamlarListe[i].anlam;
                                                if(null !== resp.anlamlarListe[i].ozelliklerListe &&
                                                    resp.anlamlarListe[i].ozelliklerListe === undefined){
                                                    if(ilkAnlamTamAdi != null && ilkAnlamTamAdi != undefined){
                                                          ozellikler += ilkAnlamTamAdi;
                                                          if(ilkAnlamTamAdi4 !== "" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined){
                                                            ozellikler += ", " + ilkAnlamTamAdi4 + " " ;
                                                          }
                                                          else{
                                                            ozellikler += " ";
                                                          }
                                                    }
                                                    else{
                                                            ozellikler += ilkAnlamTamAdiBosliste + "  ";
                                                    }
                                                }
                                                else {
                                                  for (let j in resp.anlamlarListe[i].ozelliklerListe) {

                                                    if(ilkAnlamTur === 0 ){
                                                      if(resp.anlamlarListe[i].ozelliklerListe[j].tur != undefined && resp.anlamlarListe[i].ozelliklerListe[j].tur === "3"){
                                                          ilkAnlamTur = resp.anlamlarListe[i].ozelliklerListe[j].tur;
                                                          ilkAnlamTamAdi = resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                                        }
                                                    }
                                                    else if(ilkAnlamTamAdi !=""){
                                                      if(resp.anlamlarListe[i].ozelliklerListe[j].tur != undefined && i==0 &&  resp.anlamlarListe[i].ozelliklerListe[j].tur === "3"){
                                                        ilkAnlamTur = resp.anlamlarListe[i].ozelliklerListe[j].tur;
                                                        ilkAnlamTamAdi += ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                                      }
                                                      if(resp.anlamlarListe[i].ozelliklerListe[j].tur != undefined && i==0 &&  resp.anlamlarListe[i].ozelliklerListe[j].tur === "4"){
                                                        ilkAnlamTamAdi4 = resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                                      }
                                                    }

                                                      if (resp.anlamlarListe[i].ozelliklerListe[j] !== undefined && resp.anlamlarListe[i].ozelliklerListe[j].tam_adi !== undefined &&
                                                         resp.anlamlarListe[i].ozelliklerListe[j].tam_adi !== null &&
                                                        (resp.anlamlarListe[i].ozelliklerListe[j].tur === "1" ||
                                                      resp.anlamlarListe[i].ozelliklerListe[j].tur === "4" )){
                                                        if(j == (resp.anlamlarListe[i].ozelliklerListe.length- 1) &&
                                                      resp.anlamlarListe[i].ozelliklerListe.length > 1){
                                                         ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                         if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP != "<i>"){
                                                              ozelliklerP +=   ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + "  ";
                                                         }
                                                        }
                                                       else{
                                                         if(j == (resp.anlamlarListe[i].ozelliklerListe.length-1)){
                                                           if(ilkAnlamTamAdi != null && ilkAnlamTamAdi != undefined){

                                                             if(ilkAnlamTamAdi !== ""){
                                                               if(ikinciAnlamTur3.length === 1 ){
                                                                 if(ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                                   ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                                 }
                                                                 else {
                                                                   ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                                 }

                                                               }
                                                               else{
                                                                 if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                                   ozellikler += ilkAnlamTamAdi +  ", " + ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                                 }
                                                                 else{
                                                                   ozellikler += ilkAnlamTamAdi +  ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                                 }
                                                               }
                                                            }
                                                             else{
                                                               if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                                 ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                               }
                                                               else {
                                                                 ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                                               }
                                                             }
                                                             if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP == "<i>"){
                                                               ozelliklerP += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + "  ";
                                                             }

                                                             if(resp.ozel_mi === "1"){
                                                               // ozellikler += ", özel " ;
                                                               if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                                                 ozelliklerP += ", özel " ;
                                                               }
                                                               else if(ozelliklerP.search("özel") === -1){
                                                                 ozelliklerP += "özel " ;
                                                               }
                                                             }
                                                             else{
                                                               ozellikler += " ";
                                                             }
                                                           }
                                                         }
                                                         else {
                                                           if(ilkAnlamTamAdi != null && ilkAnlamTamAdi != undefined){

                                                             if(ilkAnlamTamAdi !== ""){
                                                               if(ikinciAnlamTur3.length === 1){
                                                                 if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                                   ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                                 }
                                                                 else {
                                                                   ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                                 }
                                                               }
                                                               else {
                                                                 if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                                   ozellikler += ilkAnlamTamAdi + ", " + ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                                 }
                                                                 else {
                                                                   ozellikler += ilkAnlamTamAdi + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                                 }

                                                               }
                                                             }
                                                             else{
                                                               if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                                 ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                               }
                                                               else {
                                                                 ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                               }
                                                             }
                                                             if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP != "<i>"){
                                                               ozelliklerP +=   ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " , ";
                                                             }
                                                             if(resp.ozel_mi === "1"){
                                                               // ozellikler += " özel, " ;
                                                               if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                                                 ozelliklerP += ", özel " ;
                                                               }
                                                               else if(ozelliklerP.search("özel") === -1){
                                                                 ozelliklerP += "özel " ;
                                                               }
                                                             }
                                                           }
                                                         }

                                                      }
                                                      }
                                                      else if(resp.anlamlarListe[i].ozelliklerListe[j] != undefined &&
                                                         resp.anlamlarListe[i].ozelliklerListe[j].tam_adi != undefined &&
                                                        resp.anlamlarListe[i].ozelliklerListe[j].tam_adi != null){
                                                        if(j == (resp.anlamlarListe[i].ozelliklerListe.length- 1) ){
                                                          if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                            if(resp.anlamlarListe[i].ozelliklerListe[j].tur === "3"){
                                                              ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", " + ilkAnlamTamAdi4;
                                                            }
                                                            else {
                                                              ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi ;
                                                            }
                                                          }
                                                          else{
                                                            ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                                          }
                                                          if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP == "<i>"){
                                                            ozelliklerP += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                          }

                                                          if(resp.ozel_mi === "1"){
                                                            ozellikler += " " ;
                                                            if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                                              ozelliklerP += ", özel " ;
                                                            }
                                                            else if(ozelliklerP.search("özel") === -1){
                                                              ozelliklerP += "özel " ;
                                                            }
                                                          }
                                                          else {
                                                             ozellikler += " "
                                                          }
                                                        }
                                                       else{
                                                        ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                        if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP == "<i>"){
                                                          ozelliklerP += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                        }
                                                        if(resp.ozel_mi === "1"){
                                                          // ozellikler += "özel, ";
                                                          if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                                            ozelliklerP += ", özel " ;
                                                          }
                                                          else if(ozelliklerP.search("özel") === -1){
                                                            ozelliklerP += "özel " ;
                                                          }
                                                        }
                                                      }
                                                      }
                                                  }
                                                }


                                                if (resp.anlamlarListe[i].orneklerListe !== null && resp.anlamlarListe[i].orneklerListe !== undefined) {
                                                    anlamlar += ":";
                                                    for (k in resp.anlamlarListe[i].orneklerListe) {
                                                        if (resp.anlamlarListe[i].orneklerListe[k].yazar != null &&  typeof(resp.anlamlarListe[i].orneklerListe[k].yazar) !== "number"  ){
                                                            var yazar = resp.anlamlarListe[i].orneklerListe[k].yazar[0].tam_adi;}
                                                        else{
                                                          var yazar = "";
                                                        }
                                                        if(yazar !== "" && yazar !==null){
                                                          ornekler += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"" + "<i>" + resp.anlamlarListe[i].orneklerListe[k].ornek + "\" - </i>" + "<b>" + yazar + "</b><br>" ;
                                                        }
                                                        else
                                                        ornekler += "<i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + resp.anlamlarListe[i].orneklerListe[k].ornek + "</i><br>";
                                                    }
                                                }
                                                else if(resp.anlamlarListe[i].orneklerListe !== null && resp.anlamlarListe[i].orneklerListe !== undefined){
                                                  anlamlar += ".";
                                                }
                                                // if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1){
                                                //   if(ozelliklerP == "" ){
                                                //     ozelliklerP = ozellikler;
                                                //   }
                                                // }

                                                let lastChar = ozellikler.slice(-2);

                                                let sonOzellik = '';
                                                if(lastChar === ', '){
                                                  sonOzellik = ozellikler.slice(0,-2);
                                                  ozellikler = sonOzellik + " ";
                                                }
                                                if (resp.anlamlarListe.length > 1 ) {
                                                    if(ornekler !== ""){
                                                      anlamlarP += "<p style='font-weight:bolder'><b>" + (+i+1) + ". </b>" + "<i style='color:orange'>" + ozellikler + "</i>"+ anlamlar + "<br>" + ornekler + "</p>";
                                                    }
                                                    else{
                                                      anlamlarP += "<p style='font-weight:bolder'><b>" + (+i+1) + ". </b>" + "<i style='color:orange'>" + ozellikler + "</i>"+ anlamlar + "."
                                                    }
                                                }
                                                else { //tek anlamlı kelime
                                                  if(ornekler !== ""){
                                                    anlamlarP += "<p style='font-weight:bolder'>" + anlamlar + "<br>" + ornekler + "</p>";
                                                }
                                                else{
                                                  anlamlarP += "<p style='font-weight:bolder'>" + anlamlar + ".";
                                                }
                                              }
                                                ozellikler = "";ornekler="";anlamlar="";
                                            }
                                            if(resp.cogul_mu === "1"){
                                              if(ozelliklerP !== "<i>"){
                                                ozelliklerP += ", " + "çokluk" + ", ";
                                              }
                                                else {
                                                  ozelliklerP += "çokluk" + ", ";
                                                }
                                            }

                                       if (resp.telaffuz !== null && resp.telaffuz !== '') {
                                          if(ozelliklerP === "<i>"){
                                           ozelliklerP += "(" + resp.telaffuz + ")" ;
                                          }
                                          else
                                          ozelliklerP += ", (" + resp.telaffuz + ")" ;

                                       }

                                    if(resp.lisan !== null && resp.lisan !== ""){
                                        if(ozelliklerP === "<i>"){
                                            ozelliklerP +=resp.lisan;
                                          }
                                        else{
                                            ozelliklerP +=", " + resp.lisan;
                                          }
                                      }
                                    let setOzelliklerP = ozelliklerP.split(',').map(function(item) {return item.trim()} );
                                    let nowArray= setOzelliklerP;
                                    nowArray = nowArray.filter(function(item) {return item.trim() != ""}).map(function(k){return " " + k});
                                    ozelliklerP = "<i>";
                                    ozelliklerP += nowArray.toString() ;
                                    ozelliklerP += "</i>";
                                    $('#ozellikler-'+ value + sonuc).append(ozelliklerP);
                                    ozelliklerP="";
                                    $('#anlamlar-'+ value + sonuc).append(anlamlarP);
                                    let ataSozlerSonuc = "<table class=table-bordered style=font-weight:normal;font-size:18px>";
                                    let on_taki="";
                                      if(resp.atasozu !== null && resp.atasozu !== "" && resp.atasozu !== undefined){
                                        for (let birsonuc in resp.atasozu) {
                                          if(resp.atasozu[birsonuc].on_taki === null){
                                            on_taki=""
                                          }
                                          else{
                                            on_taki = resp.atasozu[birsonuc].on_taki
                                          }
                                          if($( window ).width() < 768){
                                            if(birsonuc % 2 == 0){
                                              ataSozlerSonuc += "<tr><td>";
                                              ataSozlerSonuc += "<a><span class=oneriler value=" + resp.atasozu[birsonuc].madde_id + " >" + on_taki + $.trim(resp.atasozu[birsonuc].madde) + "</span></a>";
                                            $('#accordionExample-' + value + sonuc + ' #ataSoz-' + value + sonuc).html(ataSozlerSonuc + "</td></tr>");
                                            }
                                            else{
                                              ataSozlerSonuc += "<td>";
                                              ataSozlerSonuc += "<a><span class=oneriler value=" + resp.atasozu[birsonuc].madde_id + " >" + on_taki + $.trim(resp.atasozu[birsonuc].madde) + "</span></a>";
                                            $('#accordionExample-' + value + sonuc + ' #ataSoz-' + value + sonuc).html(ataSozlerSonuc + "</td>");
                                            }
                                          }
                                          else {
                                            if(birsonuc % 3 == 0){
                                              ataSozlerSonuc += "<tr><td>";
                                              ataSozlerSonuc += "<a><span class=oneriler value=" + resp.atasozu[birsonuc].madde_id + " >" + on_taki + $.trim(resp.atasozu[birsonuc].madde) + "</span></a>";
                                            $('#accordionExample-' + value + sonuc + ' #ataSoz-' + value + sonuc).html(ataSozlerSonuc + "</td></tr>");
                                            }
                                            else{
                                              ataSozlerSonuc += "<td>";
                                              ataSozlerSonuc += "<a><span class=oneriler value=" + resp.atasozu[birsonuc].madde_id + " >" + on_taki + $.trim(resp.atasozu[birsonuc].madde) + "</span></a>";
                                            $('#accordionExample-' + value + sonuc + ' #ataSoz-' + value + sonuc).html(ataSozlerSonuc + "</td>");
                                            }
                                          }

                                        }
                                      }

                                      if(resp.birlesikler !== null){
                                      let birlesiklerPbyNotComma = resp.birlesikler.split(',');
                                      birlesikSozlerSonuc += "<table class=table-bordered style=font-weight:normal;font-size:18px><tbody>";
                                      for (let birsonuc in birlesiklerPbyNotComma) {

                                        if($( window ).width() < 768){
                                          if(birsonuc % 2 == 0){
                                            birlesikSozlerSonuc += "<tr><td>";
                                            birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                              $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td></tr>");
                                          }
                                          else{
                                            birlesikSozlerSonuc += "<td>";
                                            birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                              $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td>");
                                          }
                                        }
                                        else if($( window ).width() > 767 && $( window ).width() < 992){
                                          if(birsonuc % 4 == 0){
                                            birlesikSozlerSonuc += "<tr><td>";
                                            birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                              $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td></tr>");
                                          }
                                          else{
                                            birlesikSozlerSonuc += "<td>";
                                            birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                              $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td>");
                                          }
                                        }
                                        else if($( window ).width() > 991 && $( window ).width() < 1081){
                                          if(birsonuc % 5 == 0){
                                            birlesikSozlerSonuc += "<tr><td>";
                                            birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                              $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td></tr>");
                                          }
                                          else{
                                            birlesikSozlerSonuc += "<td>";
                                            birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                              $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td>");
                                          }
                                        }
                                        else if($( window ).width() > 1080 && $( window ).width() < 1280){
                                          if(birsonuc % 6 == 0){
                                            birlesikSozlerSonuc += "<tr><td>";
                                            birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                              $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td></tr>");
                                          }
                                          else{
                                            birlesikSozlerSonuc += "<td>";
                                            birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                              $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td>");
                                          }
                                        }
                                        else{
                                          if(birsonuc % 7 == 0){
                                            birlesikSozlerSonuc += "<tr><td>";
                                            birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                              $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td></tr>");
                                          }
                                          else{
                                            birlesikSozlerSonuc += "<td>";
                                            birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                              $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td>");
                                          }
                                        }


                                      }
                                      birlesikSozlerSonuc += "</tbody></table>"
                                    }
                                    sesGetirelim(resp.madde,value,sonuc);
                                    }
                                  }
                              }
                       }
                    )
                    .fail(function(e) {

                        $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                    });

                    break;

                    case 'gtsbyId'://güncel türkçe sözlük
                    $('#maddeleri-sar').css('display','block');
                      $("#maddeleri-sar").prepend("<div id=maddeler" + index + " class=lead ></div>");
                      gtsbyId = false;
                      $('li input[value=gts]:checkbox').prop('checked',true);
                        $.ajax({
                              url: 'https://sozluk.gov.tr/gts_id?id=' + gtsId,
                              dataType: 'json',
                              type: 'get',
                              success: function( data, textStatus, jQxhr ){

                                $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=hangisozluk style='color:red;text-align:center;padding-bottom:1em'></div>");
                                $('#hangisozluk-' + value ).append("<b>Güncel Türkçe Sözlük</b>".toUpperCase());
                                $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=lead style=font-weight:bolder ></div>");

                                let sapkaVarmi=false;
                                if(data != null){
                                for(let p=0 ; p < data.length; p++){
                                  if(/â/.test(data[p].madde) || /î/.test(data[p].madde) || /û/.test(data[p].madde)){
                                      sapkaVarmi=true;
                                  }
                                }
                              }
                                if ( (data.error)){
                                    $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu söz bulunamadı.");
                                    $("#maddeler" + index).append(" <hr class=hr-primary />");
                                    return false;
                                }
                                else if (data != null) {
                                  if(data !== null && data !== undefined && data.error === undefined ){
                                    data.sort(function(a,b){
                                      let x = false;
                                      let y = false;
                                      if (/â/.test(a.madde) || /î/.test(a.madde) || /û/.test(a.madde)) {
                                          x = true;
                                      }
                                      else if(/â/.test(b.madde) || /î/.test(b.madde) || /û/.test(b.madde)) {
                                          y = true;
                                      }
                                      if(x == true && y ==false){
                                        if(a.madde_id < b.madde_id)
                                        return b.madde_id - a.madde_id;
                                        else
                                        return a.madde_id - b.madde_id;
                                      }
                                      else if(y == true && x==false){
                                        if(b.madde_id < a.madde_id)
                                        return b.madde_id - a.madde_id;
                                        else
                                        return a.madde_id - b.madde_id;
                                      }
                                      else {
                                        return null;
                                      }
                                    });
                                  }

                                //en az bir sonuç var
                                    $("#isaretDili").css('margin-bottom','20px');
                                    $("#isaretDili").append("<div id=isaretSoz class=maddeler ></div>");
                                    $("#isaretSoz").append("<div id=isaretSozluk class=hangisozluk style=color:black !important;></div>");
                                    $("#isaretSozluk").html("Türk İşaret Dili Parmak alfabesiyle gösterilişi");
                                    $("#isaretSoz").append("<div id=isaretBulunan class=isaretBulunan style=color:black !important></div>");
                                    $("#isaretSoz").append(" <hr class=hr-primary />");
                                    parmaklar('#isaretBulunan',0,$('#aranan').val().trim());

                                    for (var sonuc in data) {
                                        var sapkali = false;
                                        var roman = sonuc;
                                        roman++;
                                        $("#maddeler" + index).append("<div id=bulunan-" + value + sonuc + " class=lead style=font-size:22px;font-weight:bolder;color:blue></div>");
                                        $("#maddeler" + index).append("<div id=ozellikler-" + value + sonuc + " class=lead style=font-size:20px;font-weight:bolder;color:orange !important></div>");
                                        $("#maddeler" + index).append("<div id=anlamlar-" + value + sonuc + " class=lead style=font-size:20px;color:black !important></div>");

                                        if(atadeyim){
                                          $("#maddeler" + index).append('<button id=geri class=btn onclick=geriDonAtaDeyim()><span id=leftClick2 class=glyphicon glyphicon-chevron-left></span>' + anaSoz + '</button>');
                                          $('#geri').html('<span class="glyphicon glyphicon-chevron-left" style=color:white></span><strong style=margin-left:10px;font-size:15px>' + anaSoz + '</strong>');
                                        }
                                        atadeyim=false;

                                        var resp = data[sonuc];
                                          if((resp.birlesikler !== undefined && resp.birlesikler !== null) && resp.atasozu !== undefined) {
                                          $("#maddeler" + index).append("<div class=accordion id=accordionExample-" + value + sonuc + ">"
                                          +  " <div class=card>"
                                          + " <div class=card-header id=headingOne>"
                                          + " <h5 class=mb-0>"
                                          + " <button class=btn btn-link type=button data-toggle=collapse data-target=#ataSozler-" + value + sonuc + " aria-expanded=true aria-controls=ataSozler>"
                                          + " <strong style=padding:5px;font-size:15px>Atasözleri, Deyimler veya Birleşik Fiiller</strong>"
                                          + " </button>"
                                          + " </h5>"
                                          + " </div>"
                                          + " <div id=ataSozler-" + value + sonuc + " class=collapse aria-labelledby=headingTwo data-parent=#accordionExample-" + value + sonuc + ">"
                                          + " <div id=ataSoz-" + value + sonuc + " class=card-body ataSoz-" + value + sonuc + ">"
                                          + " </div>"
                                          + " </div>"
                                          + " </div>"
                                          + " <div class=card>"
                                          + " <div class=card-header id=headingTwo>"
                                          + " <h5 class=mb-0>"
                                          + " <button class=btn btn-link collapsed type=button data-toggle=collapse data-target=#birlesikler-" + value + sonuc
                                          + "  aria-expanded=false aria-controls=collapseTwo>"
                                          + "  <strong style=padding:5px;font-size:15px>Birleşik Kelimeler</strong>"
                                          + " </button>"
                                          + " </h5>"
                                          + " </div>"
                                          + " <div id=birlesikler-" + value + sonuc + " class=collapse aria-labelledby=headingTwo data-parent=#accordionExample-" + value + sonuc + ">"
                                          + " <div id=birlesik-" + value + sonuc + " class=card-body birlesik-" + value + sonuc + ">"
                                          + " </div>"
                                          + " </div>"
                                          + " </div>"
                                          + "</div>");
                                         }
                                         else if(resp.atasozu !== undefined){
                                           $("#maddeler" + index).append("<div class=accordion id=accordionExample-" + value + sonuc + ">"
                                           +  " <div class=card>"
                                           + " <div class=card-header id=headingOne>"
                                           + " <h5 class=mb-0>"
                                           + " <button class=btn btn-link type=button data-toggle=collapse data-target=#ataSozler-" + value + sonuc + " aria-expanded=true aria-controls=ataSozler>"
                                           + " <strong style=padding:5px;font-size:15px>Atasözleri, Deyimler veya Birleşik Fiiller</strong>"
                                           + " </button>"
                                           + " </h5>"
                                           + " </div>"
                                           + " <div id=ataSozler-" + value + sonuc + " class=collapse aria-labelledby=headingTwo data-parent=#accordionExample-" + value + sonuc + ">"
                                           + " <div id=ataSoz-" + value + sonuc + " class=card-body ataSoz-" + value + sonuc + ">"
                                           + " </div>"
                                           + " </div>"
                                           + " </div>"
                                           + "</div>");
                                         }
                                         else if(resp.birlesikler !== undefined && resp.birlesikler !== null){
                                           $("#maddeler" + index).append("<div class=accordion id=accordionExample-" + value + sonuc + ">"
                                           + " <div class=card>"
                                           + " <div class=card-header id=headingTwo>"
                                           + " <h5 class=mb-0>"
                                           + " <button class=btn btn-link collapsed type=button data-toggle=collapse data-target=#birlesikler-" + value + sonuc
                                           + "  aria-expanded=false aria-controls=collapseTwo>"
                                           + " <strong style=padding:5px;font-size:15px>Birleşik Kelimeler</strong>"
                                           + " </button>"
                                           + " </h5>"
                                           + " </div>"
                                           + " <div id=birlesikler-" + value + sonuc + " class=collapse aria-labelledby=headingTwo data-parent=#accordionExample-" + value + sonuc + ">"
                                           + " <div id=birlesik-" + value + sonuc + " class=card-body birlesik-" + value + sonuc + ">"
                                           + " </div>"
                                           + " </div>"
                                           + " </div>"
                                           + "</div>");
                                         }

                                        $("#ozellikler-" + value + sonuc).append(ozelliklerP);

                                        if(/â/.test(resp.madde) || /î/.test(resp.madde) || /û/.test(resp.madde)){
                                            sapkali=true;
                                        }

                                        if(resp.on_taki != null){
                                           resp.madde = resp.on_taki + resp.madde;
                                        }

                                        if(sapkali){

                                          if(resp.taki !== null){
                                            $('#bulunan-' + value + sonuc).append(resp.madde + ", <span>  -" + resp.taki + "</span>");
                                          }
                                          else{
                                            $('#bulunan-' + value + sonuc).append(resp.madde);
                                          }
                                        }
                                        else{
                                        if(resp.ozel_mi === "0" && data.length > 1 && data.length !=2 ){
                                          if(resp.taki !== null){
                                            $('#bulunan-' + value + sonuc).append(resp.madde   + ", <span>  -" + resp.taki + "</span>" + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>');
                                          }
                                          else{
                                            $('#bulunan-' + value + sonuc).append(resp.madde + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>' );
                                          }
                                        }
                                        else if(data.length == 1){
                                          if(resp.taki !== null){
                                            $('#bulunan-' + value + sonuc).append(resp.madde + ", <span>  -" + resp.taki + "</span>");
                                          }
                                          else{
                                            $('#bulunan-' + value + sonuc).append(resp.madde);
                                          }
                                        }
                                        else{
                                          let salMi = data.filter(function(item) { return item.ozel_mi === "1" }) ;
                                          if(salMi.length > 0){
                                            if(resp.taki !== null){
                                              $('#bulunan-' + value + sonuc).append(resp.madde + ", <span>  -" + resp.taki + "</span>");
                                            }
                                            else{
                                              $('#bulunan-' + value + sonuc).append(resp.madde);
                                            }
                                          }
                                          else if(data.length != 2){
                                            if(resp.taki !== null){
                                              $('#bulunan-' + value + sonuc).append(resp.madde   + ", <span>  -" + resp.taki + "</span>" + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>');
                                            }
                                            else{
                                              $('#bulunan-' + value + sonuc).append(resp.madde + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>' );
                                            }
                                          }
                                          else if(data.length == 2 && !sapkaVarmi ){
                                            if(resp.taki !== null){
                                              $('#bulunan-' + value + sonuc).append(resp.madde   + ", <span>  -" + resp.taki + "</span>" + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>');
                                            }
                                            else{
                                              $('#bulunan-' + value + sonuc).append(resp.madde + ' <span class=roman>'+' ('+ romanize(roman)+ ')</span>' );
                                            }
                                          }
                                          else{
                                            if(resp.taki !== null){
                                              $('#bulunan-' + value + sonuc).append(resp.madde + ", <span>  -" + resp.taki + "</span>");
                                            }
                                            else{
                                              $('#bulunan-' + value + sonuc).append(resp.madde);
                                            }
                                          }

                                        }
                                      }

                                        var ozellikler="",ornekler="",
                                            anlamlar="",anlamlarP="",
                                            ozelliklerP="<i>",bilesiklerP="",
                                            birlesikSozlerSonuc="",ilkAnlamTur=0,
                                            ilkAnlamTamAdi="",ilkAnlamTamAdiBosliste="",
                                            ikinciAnlamTur3=[],ilkAnlamTamAdi4="",
                                            i,j,k,l;


                                                for (i in resp.anlamlarListe) {
                                                  if(/343/.test(resp.anlamlarListe[i].anlam)){
                                                      resp.anlamlarListe[i].anlam = resp.anlamlarListe[i].anlam.replace(/[^a-zA-ZıüöçğşÇĞŞâîûİÖÜÂÛÎ @]+/g, "<i>bakınız </i>");
                                                  }
                                                    anlamlar += resp.anlamlarListe[i].anlam;
                                                    if(null !== resp.anlamlarListe[i].ozelliklerListe &&
                                                        resp.anlamlarListe[i].ozelliklerListe === undefined){
                                                        if(ilkAnlamTamAdi != null && ilkAnlamTamAdi != undefined){
                                                          ozellikler += ilkAnlamTamAdi;
                                                          if(ilkAnlamTamAdi4 !== "" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined){
                                                            ozellikler += ", " + ilkAnlamTamAdi4 + " " ;
                                                          }
                                                          else{
                                                            ozellikler += " ";
                                                          }
                                                    }
                                                    else{
                                                            ozellikler += ilkAnlamTamAdiBosliste + "  ";
                                                    }
                                                }
                                                else {
                                                  for (let j in resp.anlamlarListe[i].ozelliklerListe) {

                                                    if(ilkAnlamTur === 0 ){
                                                      if(resp.anlamlarListe[i].ozelliklerListe[j].tur != undefined && resp.anlamlarListe[i].ozelliklerListe[j].tur === "3"){
                                                          ilkAnlamTur = resp.anlamlarListe[i].ozelliklerListe[j].tur;
                                                          ilkAnlamTamAdi = resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                                        }
                                                    }
                                                    else if(ilkAnlamTamAdi !=""){
                                                      if(resp.anlamlarListe[i].ozelliklerListe[j].tur != undefined && i==0 &&  resp.anlamlarListe[i].ozelliklerListe[j].tur === "3"){
                                                        ilkAnlamTur = resp.anlamlarListe[i].ozelliklerListe[j].tur;
                                                        ilkAnlamTamAdi += ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                                      }
                                                      if(resp.anlamlarListe[i].ozelliklerListe[j].tur != undefined && i==0 &&  resp.anlamlarListe[i].ozelliklerListe[j].tur === "4"){
                                                        ilkAnlamTamAdi4 = resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                                      }
                                                    }

                                                      if (resp.anlamlarListe[i].ozelliklerListe[j] !== undefined && resp.anlamlarListe[i].ozelliklerListe[j].tam_adi !== undefined &&
                                                         resp.anlamlarListe[i].ozelliklerListe[j].tam_adi !== null &&
                                                        (resp.anlamlarListe[i].ozelliklerListe[j].tur === "1" ||
                                                      resp.anlamlarListe[i].ozelliklerListe[j].tur === "4" )){
                                                        if(j == (resp.anlamlarListe[i].ozelliklerListe.length- 1) &&
                                                      resp.anlamlarListe[i].ozelliklerListe.length > 1){
                                                         ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                         if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP !== "<i>"){
                                                           ozelliklerP +=   ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + "  ";
                                                         }
                                                        }
                                                       else{
                                                         if(j == (resp.anlamlarListe[i].ozelliklerListe.length-1)){
                                                           if(ilkAnlamTamAdi != null && ilkAnlamTamAdi != undefined){

                                                             if(ilkAnlamTamAdi !== ""){
                                                               if(ikinciAnlamTur3.length === 1 ){
                                                                 if(ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                                   ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                                 }
                                                                 else {
                                                                   ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                                 }

                                                               }
                                                               else{
                                                                 if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                                   ozellikler += ilkAnlamTamAdi +  ", " + ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                                 }
                                                                 else{
                                                                   ozellikler += ilkAnlamTamAdi +  ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                                 }
                                                               }
                                                            }
                                                             else{
                                                               if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                                 ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                               }
                                                               else {
                                                                 ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                                               }
                                                             }
                                                             if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP == "<i>"){
                                                               ozelliklerP += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + "  ";
                                                             }
                                                             if(resp.ozel_mi === "1"){
                                                               ozellikler += " " ;
                                                               if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                                                 ozelliklerP += ", özel " ;
                                                               }
                                                               else if(ozelliklerP.search("özel") === -1){
                                                                 ozelliklerP += "özel " ;
                                                               }
                                                             }
                                                             else{
                                                               ozellikler += " ";
                                                             }
                                                           }
                                                         }
                                                         else {
                                                           if(ilkAnlamTamAdi != null && ilkAnlamTamAdi != undefined){

                                                             if(ilkAnlamTamAdi !== ""){
                                                               if(ikinciAnlamTur3.length === 1){
                                                                 if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                                   ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                                 }
                                                                 else {
                                                                   ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                                 }
                                                               }
                                                               else {
                                                                 if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                                   ozellikler += ilkAnlamTamAdi + ", " + ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                                 }
                                                                 else {
                                                                   ozellikler += ilkAnlamTamAdi + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                                 }

                                                               }
                                                             }
                                                             else{
                                                               if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                                 ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                               }
                                                               else {
                                                                 ozellikler +=  resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                               }
                                                             }
                                                             if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP !== "<i>"){
                                                               ozelliklerP +=   ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                             }
                                                             if(resp.ozel_mi === "1"){
                                                               ozellikler += " " ;
                                                               if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                                                 ozelliklerP += ", özel " ;
                                                               }
                                                               else if(ozelliklerP.search("özel") === -1){
                                                                 ozelliklerP += "özel " ;
                                                               }
                                                             }
                                                           }
                                                         }

                                                      }
                                                      }
                                                      else if(resp.anlamlarListe[i].ozelliklerListe[j] != undefined &&
                                                         resp.anlamlarListe[i].ozelliklerListe[j].tam_adi != undefined &&
                                                        resp.anlamlarListe[i].ozelliklerListe[j].tam_adi != null){
                                                        if(j == (resp.anlamlarListe[i].ozelliklerListe.length- 1) ){
                                                          if(ilkAnlamTamAdi4 !=="" && ilkAnlamTamAdi4 !== null && ilkAnlamTamAdi4 !== undefined && ilkAnlamTamAdi4 !== resp.anlamlarListe[i].ozelliklerListe[j].tam_adi){
                                                            if(resp.anlamlarListe[i].ozelliklerListe[j].tur === "3"){
                                                              ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", " + ilkAnlamTamAdi4;
                                                            }
                                                            else {
                                                              ozellikler += ilkAnlamTamAdi4 + ", " + resp.anlamlarListe[i].ozelliklerListe[j].tam_adi ;
                                                            }
                                                          }
                                                          else{
                                                            ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi;
                                                          }
                                                          if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP == "<i>"){
                                                            ozelliklerP += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + " ";
                                                          }
                                                          if(resp.ozel_mi === "1"){
                                                            ozellikler += " " ;
                                                            if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                                              ozelliklerP += ", özel " ;
                                                            }
                                                            else if(ozelliklerP.search("özel") === -1){
                                                              ozelliklerP += "özel " ;
                                                            }
                                                          }
                                                          else {
                                                             ozellikler += " "
                                                          }
                                                        }
                                                       else{
                                                        ozellikler += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                        if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1 && ozelliklerP == "<i>"){
                                                          ozelliklerP += resp.anlamlarListe[i].ozelliklerListe[j].tam_adi + ", ";
                                                        }
                                                        if(resp.ozel_mi === "1"){
                                                          ozellikler += " ";
                                                          if(ozelliklerP.search("özel") === -1 && ozelliklerP !== "<i>"){
                                                            ozelliklerP += ", özel " ;
                                                          }
                                                          else if(ozelliklerP.search("özel") === -1){
                                                            ozelliklerP += "özel " ;
                                                          }
                                                        }
                                                      }
                                                      }
                                                  }
                                                }

                                                    if (resp.anlamlarListe[i].orneklerListe !== null && resp.anlamlarListe[i].orneklerListe !== undefined) {
                                                        anlamlar += ":";
                                                        for (k in resp.anlamlarListe[i].orneklerListe) {
                                                            if (resp.anlamlarListe[i].orneklerListe[k].yazar != null &&  typeof(resp.anlamlarListe[i].orneklerListe[k].yazar) !== "number"  ){
                                                                var yazar = resp.anlamlarListe[i].orneklerListe[k].yazar[0].tam_adi;}
                                                            else{
                                                              var yazar = "";
                                                            }
                                                            if(yazar !== "" && yazar !==null){
                                                              ornekler += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"" + "<i>" + resp.anlamlarListe[i].orneklerListe[k].ornek + "\" - </i>" + "<b>" + yazar + "</b><br>" ;
                                                            }
                                                            else
                                                            ornekler += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>" + resp.anlamlarListe[i].orneklerListe[k].ornek + "</i><br>";
                                                        }
                                                    }
                                                    else if(resp.anlamlarListe[i].orneklerListe !== null && resp.anlamlarListe[i].orneklerListe !== undefined){
                                                      anlamlar += ".";
                                                    }
                                                    // if(resp.anlamlarListe !== null && resp.anlamlarListe.length == 1){
                                                    //   if(ozelliklerP == "" ){
                                                    //     ozelliklerP = ozellikler;
                                                    //   }
                                                    // }

                                                    let lastChar = ozellikler.slice(-2);

                                                    let sonOzellik = '';
                                                    if(lastChar === ', '){
                                                      sonOzellik = ozellikler.slice(0,-2);
                                                      ozellikler = sonOzellik + " ";
                                                    }
                                                    if (resp.anlamlarListe.length > 1 ) {
                                                        if(ornekler != ""){
                                                          anlamlarP += "<p style='font-weight:bolder'><b>" + (+i+1) + ". </b>" + "<i style='color:orange'>" + ozellikler + "</i>"+ anlamlar + "<br>" + ornekler + "</p>";
                                                        }
                                                        else{
                                                          anlamlarP += "<p style='font-weight:bolder'><b>" + (+i+1) + ". </b>" + "<i style='color:orange'>" + ozellikler + "</i>"+ anlamlar + "."
                                                        }

                                                          ozelliklerP="";
                                                    }
                                                    else { //tek anlamlı kelime
                                                      if(ornekler != ""){
                                                        anlamlarP += "<p style='font-weight:bolder'>" + "<i>"  + "</i>" + anlamlar + "<br>" + ornekler + "</p>";
                                                    }
                                                    else{
                                                      anlamlarP += "<p style='font-weight:bolder'>" + "<i>"  + "</i>" + anlamlar + ".";
                                                    }
                                                  }
                                                    ozellikler = "";ornekler="";anlamlar="";
                                                }
                                                if(resp.cogul_mu === "1"){
                                                  if(ozelliklerP !== "<i>")
                                                    ozelliklerP += ", " + "çokluk" + ", ";
                                                    else
                                                      ozelliklerP += "çokluk" + ", ";
                                                }
                                           if (resp.telaffuz !== null && resp.telaffuz !== '') {
                                              if(ozelliklerP === "<i>"){
                                               ozelliklerP += "(" + resp.telaffuz + ")" ;
                                              }
                                              else
                                              ozelliklerP += ", (" + resp.telaffuz + ")" ;

                                           }

                                        if(resp.lisan !== null && resp.lisan !== ""){
                                            if(ozelliklerP === "<i>"){
                                                ozelliklerP +=resp.lisan;
                                              }
                                            else{
                                                ozelliklerP +=", " + resp.lisan;
                                              }
                                          }
                                        let setOzelliklerP = ozelliklerP.split(',').map(function(item) {return item.trim()} );
                                        let nowArray= setOzelliklerP;
                                        nowArray = nowArray.filter(function(item) {return item.trim() != ""}).map(function(k){return " " + k});
                                        ozelliklerP = "<i>";
                                        ozelliklerP += nowArray.toString() ;
                                        ozelliklerP += "</i>";
                                        $('#ozellikler-'+ value + sonuc).append(ozelliklerP);
                                        ozelliklerP="";
                                        $('#anlamlar-'+ value + sonuc).append(anlamlarP);
                                        let ataSozlerSonuc = "<table class=table-bordered style=font-weight:normal;font-size:18px>";
                                        let on_taki="";
                                          if(resp.atasozu !== null && resp.atasozu !== "" && resp.atasozu !== undefined){
                                            for (let birsonuc in resp.atasozu) {
                                              if(resp.atasozu[birsonuc].on_taki === null){
                                                on_taki=""
                                              }
                                              else{
                                                on_taki = resp.atasozu[birsonuc].on_taki
                                              }
                                              if($( window ).width() < 768){
                                                if(birsonuc % 2 == 0){
                                                  ataSozlerSonuc += "<tr><td>";
                                                  ataSozlerSonuc += "<a><span class=oneriler value=" + resp.atasozu[birsonuc].madde_id + " >" + on_taki + $.trim(resp.atasozu[birsonuc].madde) + "</span></a>";
                                                $('#accordionExample-' + value + sonuc + ' #ataSoz-' + value + sonuc).html(ataSozlerSonuc + "</td></tr>");
                                                }
                                                else{
                                                  ataSozlerSonuc += "<td>";
                                                  ataSozlerSonuc += "<a><span class=oneriler value=" + resp.atasozu[birsonuc].madde_id + " >" + on_taki + $.trim(resp.atasozu[birsonuc].madde) + "</span></a>";
                                                $('#accordionExample-' + value + sonuc + ' #ataSoz-' + value + sonuc).html(ataSozlerSonuc + "</td>");
                                                }
                                              }
                                              else {
                                                if(birsonuc % 3 == 0){
                                                  ataSozlerSonuc += "<tr><td>";
                                                  ataSozlerSonuc += "<a><span class=oneriler value=" + resp.atasozu[birsonuc].madde_id + " >" + on_taki + $.trim(resp.atasozu[birsonuc].madde) + "</span></a>";
                                                $('#accordionExample-' + value + sonuc + ' #ataSoz-' + value + sonuc).html(ataSozlerSonuc + "</td></tr>");
                                                }
                                                else{
                                                  ataSozlerSonuc += "<td>";
                                                  ataSozlerSonuc += "<a><span class=oneriler value=" + resp.atasozu[birsonuc].madde_id + " >" + on_taki + $.trim(resp.atasozu[birsonuc].madde) + "</span></a>";
                                                $('#accordionExample-' + value + sonuc + ' #ataSoz-' + value + sonuc).html(ataSozlerSonuc + "</td>");
                                                }
                                              }
                                            }
                                          }

                                          if(resp.birlesikler !== null){
                                          let birlesiklerPbyNotComma = resp.birlesikler.split(',');
                                          birlesikSozlerSonuc += "<table class=table-bordered style=font-weight:normal;font-size:18px><tbody>";
                                          for (let birsonuc in birlesiklerPbyNotComma) {

                                            if($( window ).width() < 768){
                                              if(birsonuc % 2 == 0){
                                                birlesikSozlerSonuc += "<tr><td>";
                                                birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                                  $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td></tr>");
                                              }
                                              else{
                                                birlesikSozlerSonuc += "<td>";
                                                birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                                  $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td>");
                                              }
                                            }
                                            else if($( window ).width() > 767 && $( window ).width() < 992){
                                              if(birsonuc % 4 == 0){
                                                birlesikSozlerSonuc += "<tr><td>";
                                                birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                                  $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td></tr>");
                                              }
                                              else{
                                                birlesikSozlerSonuc += "<td>";
                                                birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                                  $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td>");
                                              }
                                            }
                                            else if($( window ).width() > 991 && $( window ).width() < 1081){
                                              if(birsonuc % 5 == 0){
                                                birlesikSozlerSonuc += "<tr><td>";
                                                birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                                  $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td></tr>");
                                              }
                                              else{
                                                birlesikSozlerSonuc += "<td>";
                                                birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                                  $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td>");
                                              }
                                            }
                                            else if($( window ).width() > 1080 && $( window ).width() < 1280){
                                              if(birsonuc % 6 == 0){
                                                birlesikSozlerSonuc += "<tr><td>";
                                                birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                                  $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td></tr>");
                                              }
                                              else{
                                                birlesikSozlerSonuc += "<td>";
                                                birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                                  $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td>");
                                              }
                                            }
                                            else{
                                              if(birsonuc % 7 == 0){
                                                birlesikSozlerSonuc += "<tr><td>";
                                                birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                                  $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td></tr>");
                                              }
                                              else{
                                                birlesikSozlerSonuc += "<td>";
                                                birlesikSozlerSonuc += "<a><span class=oneriler value=0>" + $.trim(birlesiklerPbyNotComma[birsonuc]) + "</span></a>";
                                                  $('#accordionExample-' + value + sonuc + ' #birlesik-' + value + sonuc).html(birlesikSozlerSonuc + "</td>");
                                              }
                                            }

                                          }
                                          birlesikSozlerSonuc += "</tbody></table>"
                                        }
                                        sesGetirelim(resp.madde,value,sonuc);
                                        }
                                      }
                                  }
                           }
                        )
                        .fail(function(e) {

                            $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                        });

                        break;

                      case 'bst': //Bilim ve Sanat Terimleri Sözlüğü
                      $('#maddeleri-sar').css('display','block');
                          $("#maddeleri-sar").append("<div id=maddeler" + index + " class=lead></div>");
                          let ilk='';
                          let sozlukSet='';
                          let son='';
                          if($('#bst :checkbox:checked').length>1){
                            let varMi = $('#bst li[value=-1] input[type=checkbox]:checked').is(':checked') ? $('#bst li[value=-1]').text() : "";

                            if(varMi.trim() == 'Tümünde Ara'){
                              ilk = varMi.indexOf('n');
                              son = varMi.slice(0,ilk).trim();
                              son=son.toLowerCase();
                            }
                            else{
                                  $('#bst :checkbox:checked').each(function(i){
                                  ilk = $(this).parent().text().indexOf('-');
                                  if(ilk === -1){
                                    ilk=$('#bst li input[type=checkbox]:checked').parent().text().length;
                                  }
                                  son = $(this).parent().text().slice(0,ilk).trim();
                                  if(i == ($('#bst li input[type=checkbox]:checked').length-1)){
                                    sozlukSet=sozlukSet.concat(son);
                                    son=sozlukSet;
                                  }
                                  else {
                                    sozlukSet=sozlukSet.concat(son + '@');
                                    son=sozlukSet;
                                  }
                                });
                            }
                          }
                          else{

                               ilk = $('#bst li input[type=checkbox]:checked').parent().text().indexOf('-');
                               if(ilk === -1){
                              ilk=$('#bst li input[type=checkbox]:checked').parent().text().length;
                                }
                                 son = $('#bst li input[type=checkbox]:checked').parent().text().slice(0,ilk).trim();
                              }
                                  let degbst = encodeURI($('#aranan').val().toLowerCase());
                                  let degSon=encodeURI(son);


                                  $.get( 'https://sozluk.gov.tr/terim?eser_ad='  + degSon + '&' + 'ara=' + degbst , '' , function(data) {
                                  $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=hangisozluk style='color:red;text-align:center;padding-bottom:1em'></div>");
                                  $('#hangisozluk-' + value ).append("<b>Bİlİm VE Sanat TerİmLERİ Sözlüğü</b>".toUpperCase());
                                  if  (data.error) {
                                        if($('#bst li input[value=hs]:checked').length == 0 && $('#bst li input[value=iets]:checked').length == 0
                                          && $('#bst li input[value=ums]:checked').length == 0){
                                        $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=bulunmayan ></div>");
                                        $("#bulunmayan-"+ value).addClass("hata"); $("#bulunmayan-" + value).html("Bu söz bulunamadı.");
                                        $("#maddeler" + index).append(" <hr class=hr-primary />");
                                      }
                                      isUms=true;
                                      return false;
                                  } else  {
                                    isUms=false;
                                    let sozlukAd="";
                                    let ozellikler="", anlamlar="",ozelliklerArray="";
                                      for (let sonuc in data) {

                                          $("#maddeler" + index).append("<span id=altBaslik-" + value + sonuc + " class='lead baslik'></span>");
                                          $("#maddeler" + index).append("<div id=bulunan-" + value + sonuc + " class=lead style=color:blue;font-weight:bolder></div>");
                                          $("#maddeler" + index).append("<div id=ozellikler-" + value + sonuc + " class=lead style=font-weight:bolder;font-size:20px;color:orange !important></div>");
                                          $("#maddeler" + index).append("<div id=anlamlar-" + value + sonuc + " class=lead style=font-weight:bolder;font-size:20px;color:black !important></div>");


                                          var resp = data[sonuc];

                                          if(resp.sozluk_ad == 'Ekonometri Terimleri Karşılıklar Sözlüğü' || resp.sozluk_ad === 'Bilgisayar Terimleri Karşılıklar Kılavuzu'
                                          || resp.sozluk_ad === 'Madencilik Terimleri Kılavuzu'){
                                            ozellikler = ((resp.eskterim == null || resp.eskterim == "") ? "" : "Türkçe: " + resp.eskterim + ",") +
                                            ((resp.ingiliz == null || resp.ingiliz == "") ? "" :  " İngilizce: " + resp.ingiliz + "," ) +
                                            ((resp.fransiz == null || resp.fransiz == "") ? "" :  " Fransızca: " + resp.fransiz + "," )  +
                                            ((resp.alman == null || resp.alman == "") ? "" :  " Almanca: " + resp.alman + "," ) +
                                            ((resp.diger == null || resp.diger == "") ? "" :  " Diğer: " + resp.diger + "," ) +
                                            ((resp.latin == null || resp.latin == "") ? "" :  " Latin: " + resp.latin) ;
                                            ozelliklerArray = ozellikler.split(',').filter(function(item){
                                            item != "";
                                            });
                                            ozellikler = "";
                                            ozellikler += "<i>" + ozelliklerArray.toString() + "</i>";
                                            anlamlar = resp.sozcuk ;

                                            if(resp.ingiliz !=null){
                                              if( resp.ingiliz != ""){
                                                $('#bulunan-'+ value + sonuc).append(resp.ingiliz);
                                                $('#ozellikler-' + value + sonuc).append(ozellikler);
                                                $('#anlamlar-' + value + sonuc).append(anlamlar);
                                              }
                                              else{
                                                $('#bulunan-'+ value + sonuc).remove();
                                                $('#altBaslik-' + value + sonuc).remove();
                                                $('#ozellikler-' + value + sonuc).remove();
                                                $('#anlamlar-' + value + sonuc).remove();
                                              }
                                            }
                                            else{
                                              $('#bulunan-'+ value + sonuc).remove();
                                              $('#altBaslik-' + value + sonuc).remove();
                                              $('#ozellikler-' + value + sonuc).remove();
                                              $('#anlamlar-' + value + sonuc).remove();
                                            }

                                          }
                                          else if(resp.sozluk_ad == 'Tıp Terimleri Kılavuzu'){
                                            $('#bulunan-'+ value + sonuc).append(resp.sozcuk);
                                            ozellikler = ((resp.eskterim == null || resp.eskterim == "") ? "" : "Türkçe: " + resp.eskterim + "," ) +
                                            ((resp.ingiliz == null || resp.ingiliz == "") ? "" :  " İngilizce: " + resp.ingiliz + "," ) +
                                            ((resp.fransiz == null || resp.fransiz == "") ? "" :  " Fransızca: " + resp.fransiz + "," )  +
                                            ((resp.alman == null || resp.alman == "") ? "" :  " Almanca: " + resp.alman + "," ) +
                                            ((resp.diger == null || resp.diger == "") ? "" :  " Diğer: " + resp.diger + "," ) +
                                            ((resp.latin == null || resp.latin == "") ? "" :  " Latin: " + resp.latin) ;
                                            ozelliklerArray = ozellikler.split(',').filter(function(item){
                                            item != "";
                                            });
                                            ozellikler = "";
                                            ozellikler += "<i>" + ozelliklerArray.toString() + "</i>";
                                            anlamlar = resp.eskterim ;

                                            $('#ozellikler-' + value + sonuc).append(ozellikler);
                                            $('#anlamlar-' + value + sonuc).append(anlamlar);
                                          }
                                          else{
                                            $('#bulunan-'+ value + sonuc).append(resp.sozcuk);
                                            ozellikler = ((resp.eskterim == null || resp.eskterim == "") ? "" : "Türkçe: " + resp.eskterim + "," ) +
                                            ((resp.ingiliz == null || resp.ingiliz == "") ? "" :  " İngilizce: " + resp.ingiliz + "," ) +
                                            ((resp.fransiz == null || resp.fransiz == "") ? "" :  " Fransızca: " + resp.fransiz + "," )  +
                                            ((resp.alman == null || resp.alman == "") ? "" :  " Almanca: " + resp.alman + "," ) +
                                            ((resp.diger == null || resp.diger == "") ? "" :  " Diğer: " + resp.diger + "," ) +
                                            ((resp.latin == null || resp.latin == "") ? "" :  " Latin: " + resp.latin) ;

                                            ozelliklerArray = ozellikler.split(',').filter(function(item){
                                              return item != "";
                                            });
                                            ozellikler = "";
                                            ozellikler += "<i>" + ozelliklerArray.toString() + "</i>";
                                            anlamlar = resp.anlam;

                                            $('#ozellikler-' + value + sonuc).append(ozellikler);
                                            $('#anlamlar-' + value + sonuc).append(anlamlar);
                                          }
                                          sozlukAd=resp.sozluk_ad + ' - ' + resp.yaytar;

                                          $('#altBaslik-' + value + sonuc).append(sozlukAd);
                                      }
                                      $("#maddeler" + index).append(" <hr class=hr-primary />");
                                  }
                             },
                             'json'
                          )
                          .fail(function() {
                              $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                          });
                          break;

                          case 'lehce': //türk lehçeleri sözlüğü
                          $('#maddeleri-sar').css('display','block');
                              $("#maddeleri-sar").append("<div id=maddeler" + index + " class=lead></div>");
                                let deglehce = encodeURI($('#aranan').val());
                              $.get( 'https://sozluk.gov.tr/lehceler?ara=' + deglehce + '&'  + 'lehce=' + checkedLehce, '' , function(data) {
                                      $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=lead style='color:red;text-align:center;padding-bottom:1em'></div>");
                                      $('#hangisozluk-' + value ).append("<b>Karşılaştırmalı Türk Lehçelerİ Sözlüğü</b>".toUpperCase());

                                      if  (data.error) {
                                          $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=bulunmayan ></div>");
                                          $("#bulunmayan-"+ value).addClass("hata"); $("#bulunmayan-" + value).html("Bu söz bulunamadı.");
                                          $("#maddeler" + index).append(" <hr class=hr-primary />");
                                          return false;
                                      } else  {
                                          for (let sonuc in data) {
                                              $("#maddeler" + index).append("<div id=hangisozluk-" + value + sonuc + " class=hangisozluk ></div>");
                                              $("#maddeler" + index).append("<div id=bulunan-" + value + sonuc + " class=lead style=color:blue></div>");
                                              $("#maddeler" + index).append("<div id=ozellikler-" + value + sonuc + " class=ozellikler ></div>");
                                              $("#maddeler" + index).append("<div id=anlamlar-" + value + sonuc + " class=lead style=color:black !important></div>");

                                              var resp = data[sonuc];
                                              $('#bulunan-'+ value + sonuc).append("<span class=lead style=font-weight:bolder;>" +
                                              resp.asil +
                                              "</span>");
                                              var ozellikler="", anlamlar="";

                                              //ozellikler = "Azerice: <br>";
                                              anlamlar = "<span class=ozellikler> Türkiye Türkçesi: </span>" +
                                                         "<span class=lead style=font-weight:bolder;>" +
                                                         $.trim(resp.turkce) +
                                                         " | </span>";
                                              anlamlar += "<span class=ozellikler> Azerbaycan Türkçesi: </span>" +
                                                         "<span class=lead style=font-weight:bolder;font-size:20px;>" +
                                                         $.trim(resp.azerice1) + " " + $.trim(resp.azerice2) + " " + $.trim(resp.azerice3) + " " + $.trim(resp.azerice4) +
                                                         " | </span>";
                                              anlamlar += "<span class=ozellikler> Başkurt Türkçesi: </span>" +
                                                         "<span class=lead style=font-weight:bolder;font-size:20px;>" +
                                                         $.trim(resp.baskurtca1) + " " + $.trim(resp.baskurtca2) + " " + $.trim(resp.baskurtca3) + " " + $.trim(resp.baskurtca4) +
                                                         " | </span>";
                                              anlamlar += "<span class=ozellikler> Kazak Türkçesi: </span>" +
                                                         "<span class=lead style=font-weight:bolder;font-size:20px;>" +
                                                         $.trim(resp.kazakca1) + " " + $.trim(resp.kazakca2) + " " + $.trim(resp.kazakca3) + " " + $.trim(resp.kazakca4) +
                                                         " | </span>";
                                              anlamlar += "<span class=ozellikler> Kırgız Türkçesi: </span>" +
                                                         "<span class=lead style=font-weight:bolder;font-size:20px;>" +
                                                         $.trim(resp.kirgizca1) + " " + $.trim(resp.kirgizca2) + " " + $.trim(resp.kirgizca3) + " " + $.trim(resp.kirgizca4) +
                                                         " | </span>";
                                              anlamlar += "<span class=ozellikler> Özbek Türkçesi: </span>" +
                                                         "<span class=lead style=font-weight:bolder;font-size:20px;>" +
                                                         $.trim(resp.ozbekce1) + " " + $.trim(resp.ozbekce2) + " " + $.trim(resp.ozbekce3) + " " + $.trim(resp.ozbekce4) +
                                                         " | </span>";
                                              anlamlar += "<span class=ozellikler> Tatar Türkçesi: </span>" +
                                                         "<span class=lead style=font-weight:bolder;font-size:20px;>" +
                                                         $.trim(resp.tatarca1) + " " + $.trim(resp.tatarca2) + " " + $.trim(resp.tatarca3) + " " + $.trim(resp.tatarca4) +
                                                         " | </span>";
                                              anlamlar += "<span class=ozellikler> Türkmen Türkçesi: </span>" +
                                                         "<span class=lead style=font-weight:bolder;font-size:20px;>" +
                                                         $.trim(resp.turkmence1) + " " + $.trim(resp.turkmence2) + " " + $.trim(resp.turkmence3) + " " + $.trim(resp.turkmence4) +
                                                         " | </span>";
                                              anlamlar += "<span class=ozellikler> Uygur Türkçesi: </span>" +
                                                         "<span class=lead style=font-weight:bolder;font-size:20px;>" +
                                                         $.trim(resp.uygurca1) + " " + $.trim(resp.uygurca2) + " " + $.trim(resp.uygurca3) + " " + $.trim(resp.uygurca4) +
                                                         " | </span>";
                                              anlamlar += "<span class=ozellikler> Rusça: </span>" +
                                                         "<span class=lead style=font-weight:bolder;font-size:20px;>" +
                                                         $.trim(resp.rusca1) + " " + $.trim(resp.rusca2) + " " + $.trim(resp.rusca3) + " " + $.trim(resp.rusca4) +
                                                         "</span>";

                                          //                                        anlamlar = "<a href=#><span class=oneriler>" + resp.asil + "</span></a><br>";

                                              //$('#ozellikler-' + value + sonuc).append(ozellikler);
                                              $('#anlamlar-' + value + sonuc).append(anlamlar);
                                          }
                                          $("#maddeler" + index).append(" <hr class=hr-primary />");
                                      }
                                 },
                                 'json'
                              )
                              .fail(function() {
                                  $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                              });
                              break;

                              case 'bati': //Türkçede Batı Kökenli Kelimeler Sözlüğü
                              $('#maddeleri-sar').css('display','block');
                                  $("#maddeleri-sar").append("<div id=maddeler" + index + " class=lead></div>");
                                  let degbati = encodeURI($('#aranan').val().toLowerCase());
                                  $.get('https://sozluk.gov.tr/bati?ara=' + degbati , '' , function(data) {
                                          $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=lead style='color:red;text-align:center;padding-bottom:1em'></div>");
                                          $('#hangisozluk-' + value ).append("<b>Türkçede Batı Kökenlİ Kelİmeler Sözlüğü</b>".toUpperCase());

                                          if  (data.error) {
                                              $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=bulunmayan style=font-weight:bolder></div>");
                                              $("#bulunmayan-" + value).html("Bu söz bulunamadı.");
                                              $("#maddeler" + index).append(" <hr class=hr-primary />");
                                              return false;
                                          } else  {
                                              for (let sonuc in data) {
                                                  $("#maddeler" + index).append("<div id=hangisozluk-" + value + sonuc + " class=hangisozluk ></div>");
                                                  $("#maddeler" + index).append("<div id=bulunan-" + value + sonuc + " class=lead style=color:blue;font-weight:bolder></div>");
                                                  $("#maddeler" + index).append("<div id=ozellikler-" + value + sonuc + " class=ozellikler ></div>");
                                                  $("#maddeler" + index).append("<div id=anlamlar-" + value + sonuc + " class=lead style=color:black !important;font-size:20px;></div>");

                                                  var resp = data[sonuc];
                                                  $('#bulunan-'+ value + sonuc).append(resp.sozcuk);
                                                  var ozellikler="", anlamlar="";
                                                  if(resp.kistdil == "Fr."){
                                                      resp.kistdil="Fransızca";
                                                  }
                                                  else if(resp.kistdil == "İt."){
                                                      resp.kistdil="İtalyanca";
                                                  }
                                                  else if(resp.kistdil == "Rum."){
                                                      resp.kistdil="Rumca";
                                                  }
                                                  else if(resp.kistdil == "İng."){
                                                      resp.kistdil="İngilizce";
                                                  }
                                                  else if(resp.kistdil == "Lat."){
                                                      resp.kistdil="Latince";
                                                  }
                                                  else if(resp.kistdil == "Alm."){
                                                      resp.kistdil="Almanca";
                                                  }
                                                  else if(resp.kistdil == "Yun."){
                                                      resp.kistdil="Yunanca";
                                                  }
                                                  else if(resp.kistdil == "Erm."){
                                                      resp.kistdil="Ermenice";
                                                  }
                                                  else if(resp.kistdil == "İsp."){
                                                      resp.kistdil="İspanyolca";
                                                  }
                                                  else if(resp.kistdil == "Rus."){
                                                      resp.kistdil="Rusça";
                                                  }
                                                  else if(resp.kistdil == "Rom."){
                                                      resp.kistdil="Rumence";
                                                  }
                                                  else if(resp.kistdil == "Bulg."){
                                                      resp.kistdil="Bulgarca";
                                                  }
                                                  else if(resp.kistdil == "Port."){
                                                      resp.kistdil="Portekizce";
                                                  }
                                                  else if(resp.kistdil == "Mac."){
                                                      resp.kistdil="Macarca";
                                                  }
                                                  else if(resp.kistdil == "Slav."){
                                                      resp.kistdil="Slavca";
                                                  }
                                                  else if(resp.kistdil == "Sırp."){
                                                      resp.kistdil="Sırpça";
                                                  }
                                                  else if(resp.kistdil == "Leh."){
                                                      resp.kistdil="Lehçe";
                                                  }
                                                  ozellikler = resp.kistdil + " " + resp.dilacik ;
                                                  anlamlar =  "<span class=lead style=font-weight:bolder;>" +
                                                   resp.anlam +
                                                   "</span>";

                                                  $('#ozellikler-' + value + sonuc).append(ozellikler);
                                                  $('#anlamlar-' + value + sonuc).append(anlamlar);
                                              }
                                              $("#maddeler" + index).append(" <hr class=hr-primary />");
                                          }
                                     },
                                     'json'
                                  )
                                  .fail(function() {
                                      $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                                  });
                                  break;

                                  case 'ads': //Atasözleri ve Deyimler Sözlüğü
                                  $('#maddeleri-sar').css('display','block');
                                      if ( $('#aranan').val().length < 2 ){return false;}
                                      $("#maddeleri-sar").append("<div id=maddeler" + index + " class=lead></div>");
                                      let degads = encodeURI($('#aranan').val());
                                      $.get('https://sozluk.gov.tr/atasozu?ara=' + degads , '' , function(data) {
                                              $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=lead style='color:red;text-align:center;padding-bottom:1em'></div>");
                                              $('#hangisozluk-' + value ).append("<b>Atasözlerİ ve Deyİmler Sözlüğü</b>".toUpperCase());

                                              if  (data.error) {
                                                  $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=bulunmayan ></div>");
                                                  $("#bulunmayan-"+ value).addClass("hata"); $("#bulunmayan-" + value).html("Bu söz bulunamadı.");
                                                  $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                  return false;
                                              } else  {
                                                  for (let sonuc in data) {
                                                      $("#maddeler" + index).append("<div id=hangisozluk-" + value + sonuc + " class=lead ></div>");
                                                      $("#maddeler" + index).append("<div id=bulunan-" + value + sonuc + " class=lead style=color:blue;font-weight:bolder></div>");
                                                      $("#maddeler" + index).append("<div id=ozellikler-" + value + sonuc + " class=ozellikler ></div>");
                                                      $("#maddeler" + index).append("<div id=anlamlar-" + value + sonuc + " class=lead style=color:black !important></div>");

                                                      var resp = data[sonuc];
                                                      //$('#hangisozluk-'+ value + sonuc).append("Türkçe'de Batı Kökenli Kelimeler Sözlüğü");
                                                      $('#bulunan-'+ value + sonuc).append(resp.sozum);
                                                      var ozellikler="", anlamlar="";
                                                      ozellikler = resp.turu2 ;
                                                      anlamlar = "<span class=lead style=font-weight:bolder;font-size:20px;>" +
                                                       resp.anlami +
                                                       "</span>";

                                                      $('#ozellikler-' + value + sonuc).append(ozellikler);
                                                      $('#anlamlar-' + value + sonuc).append(anlamlar);
                                                  }
                                                  $("#maddeler" + index).append(" <hr class=hr-primary />");
                                              }
                                         },
                                         'json'
                                      )
                                      .fail(function() {
                                          $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                                      });
                                      break;

                                      case 'ds': //Derleme Sözlüğü (Türkiye Türkçesi Ağızları Sözlüğü)
                                      $('#maddeleri-sar').css('display','block');
                                          $("#maddeleri-sar").append("<div id=maddeler" + index + " class=\"maddeler\"></div>");
                                          let degds = encodeURI($('#aranan').val());
                                          $.get( 'https://sozluk.gov.tr/derleme?ara=' + degds, '' , function(data) {
                                                  $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=lead style='color:red;text-align:center;padding-bottom:1em'></div>");
                                                  $('#hangisozluk-' + value ).append("<b>Derleme Sözlüğü (Türkİye Türkçesİ Ağızları Sözlüğü)</b>".toUpperCase());

                                                  if  (data.error) {
                                                      $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=bulunmayan ></div>");
                                                      $("#bulunmayan-"+ value).addClass("hata"); $("#bulunmayan-" + value).html("Bu söz bulunamadı.");
                                                      $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                      return false;
                                                  } else  {
                                                      for (let sonuc in data) {

                                                          $("#maddeler" + index).append("<div id=hangisozluk-" + value + sonuc + " class=lead ></div>");
                                                          $("#maddeler" + index).append("<div id=bulunan-" + value + sonuc + " class=lead style=color:blue></div>");
                                                          $("#maddeler" + index).append("<div id=anlamlar-" + value + sonuc + " class=lead style=color:black !important></div>");
                                                          $("#maddeler" + index).append("<div id=ozellikler-" + value + sonuc + " class=lead style=font-size:19px;></div>");

                                                          var resp = data[sonuc];
                                                          $('#bulunan-'+ value + sonuc).append("<span class=lead style=font-weight:bolder;font-size:20px;>" +
                                                           resp.madde_ekli +
                                                           "</span>");
                                                          var ozellikler="", anlamlar="";
                                                              if (resp.kunye_id != ''){
                                                                  ozellikler = "<span style=color:orange>" + resp.sehir + "</span>" + "<p style=color:orange;font-weight:bolder>" + resp.eser_ad + "<br>" + resp.yazar_ad + "<br>" + resp.yayin_yeri +
                                                                       "," +resp.yayinlayan + "," + resp.yayin_tarihi +
                                                                       "<br>" + resp.fiziksel + "</p>";
                                                              }


                                                          anlamlar ="<span class=lead style=font-weight:bolder;font-size:19px;>" +
                                                           resp.anlam +
                                                           "</span>";

                                                          $('#ozellikler-' + value + sonuc).append(ozellikler);
                                                          $('#anlamlar-' + value + sonuc).append(anlamlar);
                                                      }
                                                      $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                  }
                                             },
                                             'json'
                                          )
                                          .fail(function() {
                                              $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                                          });
                                          break;

                                          case 'hs'://Hemşirelik Terimleri Sözlüğü
                                          $('#maddeleri-sar').css('display','block');
                                              $("#maddeleri-sar").append("<div id=maddeler" + index + " class=lead></div>");
                                              let deghs = encodeURI($('#aranan').val());
                                              $.get( 'https://sozluk.gov.tr/hemsirelik?ara=' + deghs, '' , function(data) {
                                                if($('#bst li input[value=bst]:checked').length == 0){
                                                  $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=lead style='color:red;text-align:center;padding-bottom:1em'></div>");
                                                  $('#hangisozluk-' + value ).append("<b>Bİlİm VE Sanat TerİmLERİ Sözlüğü</b>".toUpperCase());
                                                }

                                                      if  (data.error) {
                                                        if($('#bst li input[value=iets]:checked').length == 0
                                                          && $('#bst li input[value=ums]:checked').length == 0){
                                                          $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=bulunmayan style=color:blue;font-weight:bolder></div>");
                                                          $("#bulunmayan-"+ value).addClass("hata"); $("#bulunmayan-" + value).html("Bu söz bulunamadı.");
                                                        }

                                                          return false;
                                                      } else  {
                                                          for (var sonuc in data) {
                                                              $("#maddeler" + index).append("<div id=altBaslik-" + value + sonuc + " class='lead baslik'></div>");
                                                              $("#maddeler" + index).append("<div id=hangisozluk-" + value + sonuc + " class=lead ></div>");
                                                              $("#maddeler" + index).append("<div id=bulunan-" + value + sonuc + " class=lead style=color:blue;font-weight:bolder></div>");
                                                              $("#maddeler" + index).append("<div id=ozellikler-" + value + sonuc + " class=ozellikler ></div>");
                                                              $("#maddeler" + index).append("<div id=anlamlar-" + value + sonuc + " class=lead style=color:black !important></div>");

                                                              var resp = data[sonuc];
                                                              $('#bulunan-'+ value + sonuc).append(resp.terim);
                                                              var ozellikler="", anlamlar="";

                                                              ozellikler = "<i>İngilizce: " + resp.ingilizce + "</i>";
                                                              anlamlar = "<span class=lead style=font-weight:bolder;font-size:20px;>" +
                                                               resp.tanim +
                                                               "</span>";

                                                              $('#ozellikler-' + value + sonuc).append(ozellikler);
                                                              $('#anlamlar-' + value + sonuc).append(anlamlar);
                                                            }
                                                            $('#altBaslik-' + value + sonuc).append($('#bst li input[value=hs]').parent().text());
                                                            $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                      }
                                                 },
                                                 'json'
                                              )
                                              .fail(function() {
                                                  $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                                              });
                                              break;

                                              case 'iets': //İlaç ve Eczacılık Terimleri Sözlüğü
                                              $('#maddeleri-sar').css('display','block');
                                                  $("#maddeleri-sar").append("<div id=maddeler" + index + " class=lead></div>");
                                                  let degiets= encodeURI($('#aranan').val());
                                                  $.get( 'https://sozluk.gov.tr/eczacilik?ara=' + degiets, '' , function(data) {

                                                    if($('#bst li input[value=bst]:checked').length == 0 && $('#bst li input[value=hs]:checked').length == 0){
                                                      $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=lead style='color:red;text-align:center;padding-bottom:1em'></div>");
                                                      $('#hangisozluk-' + value ).append("<b>Bİlİm VE Sanat TerİmLERİ Sözlüğü</b>".toUpperCase());
                                                    }

                                                          if  (data.error) {
                                                              if($('#bst li input[value=ums]:checked').length == 0){
                                                                $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=bulunmayan style=color:blue;font-weight:bolder></div>");
                                                                $("#bulunmayan-"+ value).addClass("hata"); $("#bulunmayan-" + value).html("Bu söz bulunamadı.");
                                                              }
                                                              return false;
                                                          } else  {
                                                              for (var sonuc in data) {
                                                                  $("#maddeler" + index).append("<div id=altBaslik-" + value + sonuc + " class='lead baslik'></div>");
                                                                  $("#maddeler" + index).append("<div id=hangisozluk-" + value + sonuc + " class=lead ></div>");
                                                                  $("#maddeler" + index).append("<div id=bulunan-" + value + sonuc + " class=lead style=color:blue;font-weight:bolder></div>");
                                                                  $("#maddeler" + index).append("<div id=ozellikler-" + value + sonuc + " class=ozellikler ></div>");
                                                                  $("#maddeler" + index).append("<div id=anlamlar-" + value + sonuc + " class=lead style=color:black !important></div>");
                                                                  var resp = data[sonuc];
                                                                  $('#bulunan-'+ value + sonuc).append(resp.terim);
                                                                  var ozellikler="", anlamlar="";

                                                                  ozellikler = "<i>İngilizce: " + resp.ingilizce + "</i>";
                                                                  anlamlar = "<span class=lead style=font-weight:bolder;font-size:20px;>" +
                                                                   resp.tanim +
                                                                   "</span>";

                                                                  $('#ozellikler-' + value + sonuc).append(ozellikler);
                                                                  $('#anlamlar-' + value + sonuc).append(anlamlar);
                                                                  }
                                                                  $('#altBaslik-' + value + sonuc).append($('#bst li input[value=iets]').parent().text());
                                                                  $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                          }
                                                     },
                                                     'json'
                                                  )
                                                  .fail(function() {
                                                      $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                                                  });
                                                  break;

                                                  case 'ums'://Uluslararası Metroloji Sözlüğü
                                                  $('#maddeleri-sar').css('display','block');
                                                      $("#maddeleri-sar").append("<div id=maddeler" + index + " class=lead></div>");
                                                      let degums= encodeURI($('#aranan').val());
                                                      $.get('https://sozluk.gov.tr/metroloji?ara=' + degums, '' , function(data) {

                                                            if($('#bst li input[value=bst]:checked').length == 0 && $('#bst li input[value=hs]:checked').length == 0
                                                              && $('#bst li input[value=iets]:checked').length == 0){
                                                              $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=lead style='color:red;text-align:center;padding-bottom:1em'></div>");
                                                              $('#hangisozluk-' + value ).append("<b>Bİlİm VE Sanat TerİmLERİ Sözlüğü</b>".toUpperCase());
                                                            }

                                                              if  (data.error) {
                                                                    if(isUms){
                                                                      $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=bulunmayan ></div>");
                                                                      $("#bulunmayan-"+ value); $("#bulunmayan-" + value).append("Bu söz bulunamadı.");
                                                                      $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                                    }
                                                                    return false;
                                                              } else  {

                                                                  for (var sonuc in data) {
                                                                      $("#maddeler" + index).append("<div id=altBaslik-" + value + sonuc + " class='lead baslik'></div>");
                                                                      $("#maddeler" + index).append("<div id=hangisozluk-" + value + sonuc + " class=lead ></div>");
                                                                      $("#maddeler" + index).append("<div id=bulunan-" + value + sonuc + " class=lead style=color:blue;font-weight:bolder></div>");
                                                                      $("#maddeler" + index).append("<div id=ozellikler-" + value + sonuc + " class=ozellikler ></div>");
                                                                      $("#maddeler" + index).append("<div id=anlamlar-" + value + sonuc + " class=lead style=color:black !important></div>");

                                                                      var resp = data[sonuc];
                                                                      $('#bulunan-'+ value + sonuc).append(resp.terim);
                                                                      var ozellikler="", anlamlar="";

                                                                      //ozellikler = "İng.:" + resp.ingilizce;
                                                                      anlamlar = "<span class=lead style=font-weight:bolder;font-size:20px;>" +
                                                                       resp.tanim +
                                                                       "</span>";

                                                                      $('#ozellikler-' + value + sonuc).append(ozellikler);
                                                                      $('#anlamlar-' + value + sonuc).append(anlamlar);
                                                                     }
                                                                      $('#altBaslik-' + value + sonuc).append($('#bst li input[value=ums]').parent().text());
                                                                      $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                              }
                                                         },
                                                         'json'
                                                      )
                                                      .fail(function() {
                                                          $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                                                      });
                                                      break;
                                                      case 'ts': // Tarama Sözlüğü
                                                      $('#maddeleri-sar').css('display','block');
                                                          $("#maddeleri-sar").append("<div id=maddeler" + index + " class=lead></div>");
                                                          let degts = encodeURI($('#aranan').val());
                                                          $.get('https://sozluk.gov.tr/tarama?ara=' + degts, '' , function(data) {

                                                                  $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=lead style='color:red;text-align:center;padding-bottom:1em'></div>");
                                                                  $('#hangisozluk-' + value ).append("<b>Tarama Sözlüğü</b>".toUpperCase());

                                                                  if  (data.error) {
                                                                      $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=bulunmayan ></div>");
                                                                      $("#bulunmayan-" + value).html("Bu söz bulunamadı.");
                                                                      $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                                      return false;
                                                                  } else  {
                                                                     data[0].tarama = data[0].tarama.sort(function(a,b){
                                                                      if(a.kelime_id < b.kelime_id)
                                                                        return b.kelime_id - a.kelime_id;
                                                                      else
                                                                        return a.kelime_id - b.kelime_id;
                                                                      });
                                                                      
                                                                      for (let sonuc in data[0].tarama) {
                                                                        
                                                                        let resp = data[0].tarama[sonuc];
                                                                        
                                                                        setTimeout(function(){
                                                                          taramaImg(resp,index,value,sonuc);
                                                                          if(sonuc == (data[0].tarama.length -1)){
                                                                            setTimeout(function(){
                                                                              if(sonuc == (data[0].tarama.length -1)){
                                                                                $("#maddeler" + index).append(" <hr id=ayrac-" + value + " class=hr-primary />");
                                                                              }
                                                                            },1000);
                                                                          }
                                                                        },700);
                                                                      }
                                                                  }
                                                             },
                                                             'json'
                                                          )
                                                          .fail(function() {
                                                              $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                                                          });
                                                          break;

                                                          case 'kisiAd': //Kişi Adları Sözlüğü
                                                          $('#maddeleri-sar').css('display','block');
                                                              $("#maddeleri-sar").append("<div id=maddeler" + index + " class=lead></div>");
                                                              newvlu=$('#aranan').val();
                                                              if(/I/.test($('#aranan').val())){
                                                                newvlu = $('#aranan').val().trim().replace('I','ı');
                                                              }
                                                              else if(/İ/.test($('#aranan').val())){
                                                                newvlu = $('#aranan').val().trim().replace('İ','i');
                                                              }
                                                              else if(/Â/.test($('#aranan').val())) {
                                                                  newvlu = $('#aranan').val().trim().replace('Â','â');
                                                              }
                                                              let degkas= encodeURI(newvlu.toLowerCase());
                                                              let cins = $('#kisiAd0 ol input[type=checkbox]:checked').val();
                                                              if(cins == undefined){
                                                                cins = "4";
                                                              }
                                                              $.ajax({
                                                                  url: 'https://sozluk.gov.tr/adlar?ara=' + degkas + '&gore=1' + '&cins=' + cins,
                                                                  dataType: 'json',
                                                                  type: 'get',
                                                                  success: function( data, textStatus, jQxhr ){
                                                                      $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=lead style='color:red;text-align:center;padding-bottom:1em'></div>");
                                                                      $('#hangisozluk-' + value ).append("<b>KİŞİ Adları Sözlüğü</b>".toUpperCase());
                                                                      if (data.error){
                                                                          $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=bulunmayan ></div>");
                                                                          $("#bulunmayan-"+ value).addClass("hata"); $("#bulunmayan-" + value).html("Bu söz bulunamadı.");
                                                                          $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                                          return false;
                                                                      } else {

                                                                              $("#maddeler" + index).append("<div id=hangisozluk-" + value  + " class=lead ></div>");
                                                                              $("#maddeler" + index).append("<div id=bulunan-" + value  + " class=lead style=color:blue;font-weight:bolder></div>");
                                                                              $("#maddeler" + index).append("<div id=ozellikler-" + value  + " class=ozellikler ></div>");
                                                                              $("#maddeler" + index).append("<div id=anlamlar-" + value  + " class=lead style=color:black !important></div>");

                                                                              var resp = data;
                                                                              $('#bulunan-'+ value ).append(resp[0].ad);
                                                                              var ozellikler="", anlamlar="",anlamlarP="", i;
                                                                              let koken = "";
                                                                              for (i in resp) {
                                                                                if(resp[i].koken == "T.+Far."){
                                                                                      koken = "Türkçe" + " + " + "Farsça";
                                                                                    }
                                                                                    else if(resp[i].koken == "Far.+T."){
                                                                                      koken = "Farsça" + " + " + "Türkçe";
                                                                                    }
                                                                                    else if(resp[i].koken == "T.+Ar."){
                                                                                      koken = "Türkçe" + " + " + "Arapça";
                                                                                    }
                                                                                    else if(resp[i].koken == "Ar."){
                                                                                        koken = "Arapça";
                                                                                    }
                                                                                    else if(resp[i].koken == "T."){
                                                                                        koken = "Türkçe";
                                                                                    }
                                                                                    else if(resp[i].koken == "Far."){
                                                                                        koken = "Farsça"
                                                                                    }
                                                                                    else if(resp[i].koken == "İbr."){
                                                                                        koken = "İbranice"
                                                                                    }
                                                                                    else if(resp[i].koken == "Soğd."){
                                                                                        koken = "Soğdca"
                                                                                    }
                                                                                    else if(resp[i].koken == "Yun."){
                                                                                        koken = "Yunanca"
                                                                                    }
                                                                                    else if(resp[i].koken == "Moğ."){
                                                                                        koken = "Moğolca"
                                                                                    }
                                                                                    else if(resp[i].koken == "Rum."){
                                                                                        koken = "Rumca"
                                                                                    }
                                                                                    else{
                                                                                        koken = resp[i].koken;
                                                                                    }
                                                                                    if(resp[i].koken == null)
                                                                                        ozellikler = "<span class=ozellikler>";
                                                                                    else
                                                                                    ozellikler = "<span class=ozellikler>Köken: " + koken ;
                                                                                  switch (resp[i].cins) {
                                                                                      case "1":
                                                                                          ozellikler += ", Cinsiyet: Kız" + "</span>";
                                                                                          break;
                                                                                      case "2":
                                                                                          ozellikler += ", Cinsiyet: Erkek" + "</span>";
                                                                                  }
                                                                                  anlamlar = "<span class=lead style=font-weight:bolder;font-size:20px;>" +
                                                                                   resp[i].anlam +
                                                                                   "</span>";
                                                                                  anlamlarP += "<p><i>" + ozellikler + "</i><br>"+ anlamlar + "<br></p>";
                                                                                  ozellikler = "";anlamlar="";
                                                                              }

                                                                              //$('#ozellikler-' + value ).append(ozelliklerP);
                                                                              $('#anlamlar-' + value ).append(anlamlarP);
                                                                              $("#maddeler" + index).append(" <hr class=hr-primary />");

                                                                      }

                                                                  },
                                                                  error: function( jqXhr, textStatus, errorThrown ){
                                                                      $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                                                                  }
                                                              });
                                                              break;
                                                              case 'kisiAnlam': //Kişi Adları Sözlüğü
                                                              $('#maddeleri-sar').css('display','block');
                                                                  $("#maddeleri-sar").append("<div id=maddeler" + index + " class=lead></div>");
                                                                  let degkasAnlam= encodeURI($('#aranan').val().toLowerCase());
                                                                  let cinsAnlam = $('#kisiAnlam0 ol input[type=checkbox]:checked').val();
                                                                  if(cinsAnlam == undefined){
                                                                    cinsAnlam = "4";
                                                                  }
                                                                  $.ajax({
                                                                      url: 'https://sozluk.gov.tr/adlar?ara=' + degkasAnlam + '&gore=2' + '&cins=' + cinsAnlam,
                                                                      dataType: 'json',
                                                                      type: 'get',
                                                                      success: function( data, textStatus, jQxhr ){
                                                                          $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=lead style='color:red;text-align:center;padding-bottom:1em'></div>");
                                                                          $('#hangisozluk-' + value ).append("<b>KİŞİ Adları Sözlüğü</b>".toUpperCase());
                                                                          if (data.error){
                                                                              $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=bulunmayan ></div>");
                                                                              $("#bulunmayan-"+ value).addClass("hata"); $("#bulunmayan-" + value).html("Bu söz bulunamadı.");
                                                                              $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                                              return false;
                                                                          } else {
                                                                                  $("#maddeler" + index).append("<div id=bulunan-" + value  + "></div>");
                                                                                  $('#bulunan-' + value).append("<div id=baslikKisi-" + value + " style = margin-bottom:20px;color:blue;font-size:18px;justify-content:'center'></div>");
                                                                                  $('#baslikKisi-' + value).html('Aradığınız koşullara uygun aşağıdaki adlar bulundu.');
                                                                                  $('#bulunan-' + value).append("<div id=TabloKisiAd-" + value + "></div>");
                                                                                  var resp = data;
                                                                                  let koken="";
                                                                                  let cinsiyet="";

                                                                                let adlarTablo = "";
                                                                                adlarTablo = "<table class=table-bordered style=font-weight:normal;font-size:16px>";
                                                                                adlarTablo += "<thead style=color:#cd853f;><tr><th>Ad</th><th>Köken</th><th>Cins</th></tr></thead>";
                                                                                    if(resp !== null  && resp !== undefined && resp.length > 0){
                                                                                      for (let i in resp) {
                                                                                        if(resp[i].koken == "T.+Far."){
                                                                                              koken = "Türkçe" + " + " + "Farsça";
                                                                                            }
                                                                                            if(resp[i].koken == "Far.+T."){
                                                                                                  koken = "Farsça" + " + " + "Türkçe";
                                                                                                }
                                                                                            else if(resp[i].koken == "T.+Ar."){
                                                                                              koken = "Türkçe" + " + " + "Arapça";
                                                                                            }
                                                                                            else if(resp[i].koken == "Ar."){
                                                                                                koken = "Arapça";
                                                                                            }
                                                                                            else if(resp[i].koken == "T."){
                                                                                                koken = "Türkçe";
                                                                                            }
                                                                                            else if(resp[i].koken == "Far."){
                                                                                                koken = "Farsça"
                                                                                            }
                                                                                            else if(resp[i].koken == "İbr."){
                                                                                                koken = "İbranice"
                                                                                            }
                                                                                            else if(resp[i].koken == "Soğd."){
                                                                                                koken = "Soğdca"
                                                                                            }
                                                                                            else if(resp[i].koken == "Yun."){
                                                                                                koken = "Yunanca"
                                                                                            }
                                                                                            else if(resp[i].koken == "Moğ."){
                                                                                                koken = "Moğolca"
                                                                                            }
                                                                                            else if(resp[i].koken == "Rum."){
                                                                                                koken = "Rumca"
                                                                                            }
                                                                                            else if(resp[i].koken == "İt."){
                                                                                                koken = "İtalyanca"
                                                                                            }
                                                                                            else{
                                                                                                koken = resp[i].koken;
                                                                                            }
                                                                                          switch (resp[i].cins) {
                                                                                              case "1":
                                                                                                  cinsiyet = "Kız";
                                                                                                  break;
                                                                                              case "2":
                                                                                                cinsiyet = "Erkek";
                                                                                          }
                                                                                        if($( window ).width() < 768){
                                                                                            adlarTablo += "<tr><td>";
                                                                                            adlarTablo += "<a href=#><span style=color:blue class=onerilerKas value=" + resp[i].ad_id + " >" + $.trim(resp[i].ad) + "</span></a></td>" +
                                                                                            "<td>" + koken + "</td>" + "<td>" + cinsiyet +  "</td>"
                                                                                          $('#TabloKisiAd-' + value).html(adlarTablo + "</td></tr>");
                                                                                        }
                                                                                        else {
                                                                                          adlarTablo += "<tr><td>";
                                                                                          adlarTablo += "<a href=#><span class=onerilerKas value=" + resp[i].ad_id + " >" + $.trim(resp[i].ad) + "</span></a></td>" +
                                                                                          "<td>" + koken + "</td>" + "<td>" + cinsiyet +  "</td>"
                                                                                          $('#TabloKisiAd-' + value).html(adlarTablo + "</td></tr>");
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }

                                                                      },
                                                                      error: function( jqXhr, textStatus, errorThrown ){
                                                                          $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                                                                      }
                                                                  });
                                                                  break;
                                                              case 'sks': //Sıkça Karıştırılan Sözler Kılavuzu
                                                              $('#maddeleri-sar').css('display','block');
                                                                  $("#maddeleri-sar").append("<div id=maddeler" + index + " class=lead></div>");
                                                                  let degsks = encodeURI($('#aranan').val());
                                                                  $.get( 'https://sozluk.gov.tr/kilavuz?prm=' + value +'&ara=' + degsks, '' , function(data) {

                                                                          //var response = JSON.parse(data);
                                                                          $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=hangisozluk style='color:red;text-align:center;padding-bottom:1em'></div>");
                                                                          $('#hangisozluk-' + value ).append("<b>Sikça Kariştirilan Sözler Kilavuzu</b>".toUpperCase());

                                                                          if  (data.error) {
                                                                              $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=bulunmayan style=font-size:20px;></div>");
                                                                              $("#bulunmayan-"+ value).addClass("hata"); $("#bulunmayan-" + value).html("Bu söz bulunamadı.");
                                                                              $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                                              return false;
                                                                          } else  {
                                                                              for (var sonuc in data) {
                                                                                  $("#maddeler" + index).append("<div id=hangisozluk-" + value + sonuc + " class=hangisozluk ></div>");
                                                                                  $("#maddeler" + index).append("<div id=bulunan-" + value + sonuc + " class=lead style=color:blue></div>");
                                                                                  $("#maddeler" + index).append("<div id=anlamlar-" + value + sonuc + " class=lead ></div>");

                                                                                  var resp = data[sonuc];
                                                                                  $('#bulunan-'+ value + sonuc).append("<div class=column style=font-weight:bolder;font-size:20px;>" + resp.kelime1 + "</div>");
                                                                                  $('#bulunan-'+ value + sonuc).append("<div class=column style=font-weight:bolder;font-size:20px;>" + resp.kelime2 + "</div>");
                                                                                  $('#anlamlar-' + value + sonuc).append("<div class=column style=font-weight:bolder;font-size:20px;>" + resp.anlam1 + "</div>");
                                                                                  $('#anlamlar-' + value + sonuc).append("<div class=column style=font-weight:bolder;font-size:20px;>" + resp.anlam2 + "</div>");

                                                                              }
                                                                              $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                                          }
                                                                     },
                                                                     'json'
                                                                  )
                                                                  .fail(function() {
                                                                      $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                                                                  });
                                                                  break;
                                                              case 'ysk': //Yabancı Sözlere Karşılıklar Kılavuzu
                                                              $('#maddeleri-sar').css('display','block');
                                                                  $("#maddeleri-sar").append("<div id=maddeler" + index + " class=lead></div>");
                                                                    let degysk = encodeURI($('#aranan').val());
                                                                  $.get( 'https://sozluk.gov.tr/kilavuz?prm=' + value +'&ara=' + degysk, '' , function(data) {
                                                                          $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=hangisozluk style='color:red;text-align:center;padding-bottom:1em'></div>");
                                                                          $('#hangisozluk-' + value ).append("<b>Yabancı Sözlere Karşılıklar Kılavuzu</b>".toUpperCase());

                                                                          if  (data.error) {
                                                                              $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=bulunmayan style=font-size:20px;></div>");
                                                                              $("#bulunmayan-"+ value).addClass("hata"); $("#bulunmayan-" + value).html("Bu söz bulunamadı.");
                                                                              $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                                              return false;
                                                                          } else  {
                                                                              for (var sonuc in data) {
                                                                                  $("#maddeler" + index).append("<div id=hangisozluk-" + value + sonuc + " class=hangisozluk ></div>");
                                                                                  $("#maddeler" + index).append("<div id=bulunan-" + value + sonuc + " class=lead style=color:blue></div>");
                                                                                  $("#maddeler" + index).append("<div id=anlamlar-" + value + sonuc + " class=lead style=font-weight:bolder;font-size:20px;></div>");

                                                                                  var resp = data[sonuc];
                                                                                  $('#bulunan-'+ value + sonuc).append("<div class=lead style=font-weight:bolder>" + resp.kkelime + "</div>");
                                                                                  $('#bulunan-'+ value + sonuc).append("<div class=lead style=font-weight:bolder>" + resp.kkarsilik + "</div>");
                                                                                  $('#anlamlar-' + value + sonuc).append(resp.anlam);

                                                                              }
                                                                              $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                                          }
                                                                     },
                                                                     'json'
                                                                  )
                                                                  .fail(function() {
                                                                      $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                                                                  });
                                                                  break;
                                                              case 'syyd': //Sıkça Yapılan Yanlışlara lar Kılavuzu
                                                              $('#maddeleri-sar').css('display','block');
                                                                  $("#maddeleri-sar").append("<div id=maddeler" + index + " class=lead></div>");
                                                                    let degsyyd= encodeURI($('#aranan').val());
                                                                  $.get( 'https://sozluk.gov.tr/kilavuz?prm=' + value +'&ara=' + degsyyd, '' , function(data) {
                                                                          $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=hangisozluk style='color:red;text-align:center;padding-bottom:1em'></div>");
                                                                          $('#hangisozluk-' + value ).append("<b>Sıkça Yapılan Yanlışlara Doğrular Kılavuzu</b>".toUpperCase());

                                                                          if  (data.error) {
                                                                              $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=bulunmayan style=font-size:20px;></div>");
                                                                              $("#bulunmayan-"+ value).addClass("hata"); $("#bulunmayan-" + value).html("Bu söz bulunamadı.");
                                                                              $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                                              return false;
                                                                          } else  {
                                                                              for (var sonuc in data) {
                                                                                  $("#maddeler" + index).append("<div id=hangisozluk-" + value + sonuc + " class=hangisozluk ></div>");
                                                                                  $("#maddeler" + index).append("<div id=bulunan-" + value + sonuc + " class=lead style=color:blue;></div>");
                                                                                  $("#maddeler" + index).append("<div id=anlamlar-" + value + sonuc + " class=lead style=font-weight:bolder;font-size:20px;></div>");

                                                                                  var resp = data[sonuc];
                                                                                  $('#bulunan-'+ value + sonuc).append("<div class=column dogrusu style=font-weight:bolder;font-size:20px;>" + resp.dogrukelime + "</div>");
                                                                                  $('#bulunan-'+ value + sonuc).append("<div class=column yanlisi style=font-weight:bolder;font-size:20px;>" + resp.yanliskelime + "</div>");
                                                                                  $('#anlamlar-' + value + sonuc).append(resp.anlam1);

                                                                              }
                                                                              $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                                          }
                                                                     },
                                                                     'json'
                                                                  )
                                                                  .fail(function() {
                                                                      $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                                                                  });
                                                                  break;
                                                                  case 'etms': //Etimoloji Sözlüğü
                                                                  $('#maddeleri-sar').css('display','block');
                                                                 $("#maddeleri-sar").append("<div id=maddeler" + index + " class=lead></div>");
                                                                   let etmsVal= encodeURI($('#aranan').val());
                                                                 $.get( 'https://sozluk.gov.tr/etms?' + 'ara=' + etmsVal, '' , function(data) {
                                                                         $("#maddeler" + index).append("<div id=hangisozluk-" + value + " class=hangisozluk style='color:red;text-align:center;padding-bottom:1em'></div>");
                                                                         $('#hangisozluk-' + value ).append("<b>EREN TÜRK DİLİNİN ETİMOLOJİK SÖZLÜĞÜ</b>".toUpperCase());

                                                                         if  (data.error) {
                                                                             $("#maddeler" + index).append("<div id=bulunmayan-" + value + " class=bulunmayan style=font-size:20px;></div>");
                                                                             $("#bulunmayan-"+ value).addClass("hata"); $("#bulunmayan-" + value).html("Bu söz bulunamadı.");
                                                                             $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                                             return false;
                                                                         } else  {
                                                                             for (var sonuc in data) {
                                                                                 $("#maddeler" + index).append("<div id=hangisozluk-" + value + sonuc + " class=hangisozluk ></div>");
                                                                                 $("#maddeler" + index).append("<div id=bulunan-" + value + sonuc + " class=lead></div>");
                                                                                 $("#maddeler" + index).append("<div id=anlamlar-" + value + sonuc + " class=lead style=font-weight:bolder;font-size:20px;></div>");

                                                                                 var resp = data[sonuc];
                                                                                 $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:40px;color:blue;margin-bottom:10px;>" + resp.maddeGoster + "</div>");
                                                                                 if(resp.tur !== ""){
                                                                                  $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;color:orange;margin-bottom:10px;><i>" + resp.tur + "</i></div>");
                                                                                }
                                                                                 if(resp.anlam !== ""){
                                                                                   $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;>" + "1. " + resp.anlam + "</div>");  
                                                                                 }
                                                                                 if(resp.anlam1 !== ""){
                                                                                  if(resp.anlam1 !== "" && resp.anlam2 === ""){
                                                                                    $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;>" + resp.anlam1 + "</div>");
                                                                                  }
                                                                                  else
                                                                                   $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;>" + "<b>1.</b> " + resp.anlam1 + "</div>");
                                                                                 }
                                                                                if(resp.anlam2 !== ""){
                                                                                 $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;>" + "<b>2.</b> " + resp.anlam2 + "</div>");
                                                                                }
                                                                                if(resp.anlam3 !== ""){
                                                                                   $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;>" + "<b>3.</b> " + resp.anlam3 + "</div>");
                                                                                }
                                                                                if(resp.anlam4 !== ""){
                                                                                 $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;>" + "<b>4.</b> " +resp.anlam4 + "</div>");
                                                                               }
                                                                               if(resp.anlam5 !== ""){
                                                                                 $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;>" + "<b>5.</b> " + resp.anlam5 + "</div>");
                                                                               }
                                                                               if(resp.anlam6 !== ""){
                                                                                 $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;>" + "<b>6.</b> " +  resp.anlam6 + "</div>");
                                                                               }
                                                                               if(resp.anlam7 !== ""){
                                                                                 $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;>" + "<b>7.</b> " + resp.anlam7 + "</div>");
                                                                               }
                                                                               if(resp.anlam8 !== ""){
                                                                                 $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;>" + "<b>8.</b> " + resp.anlam8 + "</div>");
                                                                               }
                                                                               if(resp.aciklama !== ""){
                                                                                 $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;margin-top:10px;>" + resp.aciklama + "</div>");
                                                                               }
                                                                               if(resp.kaynak !==""){
                                                                                 $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;>" + resp.kaynak + "</div>");
                                                                               } 
                                                                               if(resp.bk1 !== ""){
                                                                                $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;>bk. <a class = etms style=text-decoration:none;color:blue ><i>" + resp.bk1 + "</i></a></div>");
                                                                              }
                                                                              if(resp.bk2 !== ""){
                                                                                $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;>bk. <a class = etms style=text-decoration:none;color:blue ><i>" + resp.bk2 + "</i></a></div>");
                                                                              }
                                                                              if(resp.bk3 !== ""){
                                                                                $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;>bk. <a class = etms style=text-decoration:none;color:blue ><i>" + resp.bk3 + "</i></a>");
                                                                              }
                                                                              if(resp.bk4 !== ""){
                                                                                $('#bulunan-'+ value + sonuc).append("<div class=column  style=font-weight:bolder;font-size:20px;>bk. <a class = etms style=text-decoration:none;color:blue ><i>" + resp.bk4 + "</i></a>");
                                                                              }
                                                                             }
                                                                             $("#maddeler" + index).append(" <hr class=hr-primary />");
                                                                         }
                                                                    },
                                                                    'json'
                                                                 )
                                                                 .fail(function() {
                                                                     $("#bulunmayan-" + value).addClass("hata"); $("#bulunmayan-" + value).html("Bu sözlüğe şu an ulaşılamıyor.");
                                                                 });
                                                                 break;

                                                  default:

                                                  }
                                                });
                                                return false;
                                                });
                                                });
