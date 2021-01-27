using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ChatrelPaymentWebAPI.Controllers
{
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class GeneratePDFController : ControllerBase
    {
        private IConverter _converter;
        public GeneratePDFController(IConverter converter)
        {
            _converter = converter;
        }
        [HttpGet]
        [Route("[action]")]
        public IActionResult CreatePDF()
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10 },
                DocumentTitle = "PDF Report",
                Out = @"E:\Employee_Report.pdf"
            };
            var sb = new StringBuilder();
            sb.Append(@"
                        <html>
                            <head>
                            </head>
                            <body>
                                <table id='mytable' class='mytable' cellspacing='0' style='border:2px solid #000000' data-reactroot=''>
  <tr>
    <td width='20'></td>
    <td width='300'></td>
    <td width='225'></td>
    <td width='225'></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colSpan='2' height='35' align='left' valign='middle'><b><font face='Microsoft Himalaya' size='5' color='#000000'>༄༅། །བཙན་བྱོལ་བོད་མིའི་དཔྱ་དངུལ་བྱུང་འཛིན་ཨང་།</font></b></td>
    <td align='right'>QR</td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colspan='2' height='28' align='left' valign='middle'><b><font face='Microsoft Himalaya' size='4' color='#000000'>མིང་།</font><font size='4' color='#000000'>FirstName</font></b></td>
    <td align='right' valign='middle'><b><font face='Microsoft Himalaya' size='4' color='#000000'>རང་ལོ།   AGE</font></b></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td colspan='5' height='27' align='left' valign='top'>
      <table>
        <tr>
          <td style='width:200px;padding-left:20px;border-top:2px solid #000000'><b><font face='Microsoft Himalaya' size='4' color='#000000'>དཔྱ་དེབ་ཨང་།</font></b></td>
          <td align='center' style='border:2px solid #000000' width='32'><b><font size='4' color='#000000'>X</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>X</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>0</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>0</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>0</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>0</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>0</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>0</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>0</font></b></td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colSpan='3' height='7' align='left' valign='top'><font face='Microsoft Himalaya' size='4' color='#000000'></font></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20' height='26' style='border-bottom:1px solid #000000'></td>
    <td colspan='2' style='border-bottom:1px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>༡། དཔྱ་དངུལ།</font></b></td>
    <td style='border-bottom:2px solid #000000' align='left' valign='bottom'>
      <b>
        <font face='Microsoft Himalaya' size='4' color='#000000'>
          སྒོར།<!-- --> <!-- -->Chatrel
        </font>
      </b>
    </td>
    <td width='20' style='border-bottom:2px solid #000000'></td>
  </tr>
  <tr>
    <td width='20' style='border-bottom:1px solid #000000' height='26'></td>
    <td colspan='2' style='border-bottom:1px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>༢། ཟས་བཅད་དོད།</font></b></td>
    <td style='border-bottom:2px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>སྒོར།  Meal</font></b></td>
    <td width='20' style='border-bottom:2px solid #000000'></td>
  </tr>
  <tr>
    <td width='20' style='border-bottom:1px solid #000000' height='26'></td>
    <td colspan='2' style='border-bottom:1px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>༣། ཕོགས་འབབ།</font></b></td>
    <td style='border-bottom:2px solid #000000' align='left' valign='bottom'>
      <b>
        <font face='Microsoft Himalaya' size='4' color='#000000'>
          སྒོར།<!-- --> <!-- -->Salary
        </font>
      </b>
    </td>
    <td width='20' style='border-bottom:2px solid #000000'></td>
  </tr>
  <tr>
    <td width='20' style='border-bottom:1px solid #000000' height='26'></td>
    <td colspan='2' style='border-bottom:1px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>༤། ཚོང་ཁེའི་བློས་བཅད་ཞལ་འདེབས།</font></b></td>
    <td style='border-bottom:2px solid #000000' align='left' valign='bottom'>
      <b>
        <font face='Microsoft Himalaya' size='4' color='#000000'>
          སྒོར།<!-- --> <!-- -->BDON
        </font>
      </b>
    </td>
    <td width='20' style='border-bottom:2px solid #000000'></td>
  </tr>
  <tr>
    <td width='20' style='border-bottom:1px solid #000000' height='26'></td>
    <td colspan='2' style='border-bottom:1px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>༥། དཔྱ་དངུལ་འབུལ་ཆད་འབབ།</font></b></td>
    <td style='border-bottom:2px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>སྒོར །</font></b></td>
    <td width='20' style='border-bottom:2px solid #000000'></td>
  </tr>
  <tr>
    <td width='20' style='border-bottom:1px solid #000000' height='26'></td>
    <td colspan='2' style='border-bottom:1px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>༦། འཕར་འབུལ་ཞལ་འདེབས།</font></b></td>
    <td style='border-bottom:2px solid #000000' align='left' valign='bottom'>
      <b>
        <font face='Microsoft Himalaya' size='4' color='#000000'>
          སྒོར།<!-- --> <!-- -->ADO
        </font>
      </b>
    </td>
    <td width='20' style='border-bottom:2px solid #000000'></td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colSpan='3' height='10' align='left' valign='top'><font face='Microsoft Himalaya' size='4' color='#000000'></font></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20' height='34'></td>
    <td colspan='2' align='left' valign='bottom'>
      <font face='Microsoft Himalaya' size='4' color='#000000'>
        <b>བཅས་བསྡོམས་</b> <!-- -->US$/CA$/AU$/NT$/CHF/EURO/GBP/YEN/RR/
      </font>
    </td>
    <td align='left' style='padding-left:30px' valign='bottom'>
      <b>
        <font face='Microsoft Himalaya' size='4' color='#000000'>
          སྒོར<!-- --> 
        </font>
        <font size='4' color='#000000'>TOTAL</font>
      </b>
    </td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20' height='31'></td>
    <td colspan='3' align='left' valign='middle'>
      <font face='Microsoft Himalaya' size='4' color='#000000'>
        <b>
          ཕྱི་ལོ་༌་་་་་་་་་་་་་་༌༌༌༌༌་་་་་་་་་་་་༌༌༌༌༌༌༌༌༌༌༌ལོའི་དཔྱ་དངུལ་འབུལ་འབབ་རྩིས་འབུལ་བྱུང་བའི་འཛིན་དུ།<!-- --> 
        </b>
      </font>
    </td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colSpan='3' height='32' align='left' valign='top'><font face='Microsoft Himalaya' size='4' color='#000000'></font></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20' height='33'></td>
    <td colspan='3' align='left' valign='middle'><font face='Microsoft Himalaya' size='4' color='#000000'><b>བོད་རིགས་སྤྱི་མཐུན་ཚོགས་པའམ་བོད་རིགས་ཚོགས་པའི་ལས་དམ་དང་མཚན་རྟགས།     ཕྱི་ལོ༌       ཟླ་       ཚེས་     ལ།</b></font></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colSpan='3' height='16' align='left' valign='top'><font size='2' color='#000000'>This is computer generated Chatrel receipt, no signature required.</font></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colSpan='3' height='16' align='left' valign='top'><font size='2' color='#000000'>You are advised to update chatrel contribution on your <br/>Greenbook from Office of Tibet or concerned Tibetan Association/Tibetan Community.</font></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colSpan='3' height='16' align='left' valign='top'><font face='Microsoft Himalaya' size='4' color='#000000'></font></td>
    <td width='20'></td>
  </tr>
</table>
                            </body>
                        </html>");
            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = sb.ToString(),
                WebSettings = { DefaultEncoding = "utf-8" },
                //   HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                // FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
            };
            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };
            _converter.Convert(pdf);
            return Ok("Successfully created PDF document.");
        }
    }

}
