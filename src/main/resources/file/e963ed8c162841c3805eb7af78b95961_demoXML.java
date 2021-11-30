package com.example.weatherdemo.Controller;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

public class demoXML {
    public static void main(String[] args) throws IOException, DocumentException {
        //1、获取到xml资源的输入流
        URL url = new URL("http://wthrcdn.etouch.cn/WeatherApi?city=北京");

        //URL url = new URL("http://apis.juhe.cn/mobile/get?%20phone=" + phone + "&dtype=xml&key=9f3923e8f87f1ea50ed4ec8c39cc9253");
        //打开链接
        URLConnection conn = url.openConnection();
        //拿下网址的输入流
        InputStream is = conn.getInputStream();
        //2、创建一盒XML读取对象
        SAXReader sr = new SAXReader();
        //3、通过读取对象 读取xml数据吗，并返回文档对象
        Document doc = sr.read(is);
        //4、获取根节点
        Element root = doc.getRootElement();
        //5、解析内容
        System.out.println(root.elementText("city"));
        //String code = root.elementText("resultcode");
        //如果code不是200,就不是在查询号码，程序会报错。
        /*if ("200".equals(code)) {
            Element result = root.element("result");
            String province = result.elementText("province");
            String city = result.elementText("city");
            String areacode = result.elementText("areacode");
            String company = result.elementText("company");
            //内层if是为了筛选当城市和号码归属地一样的时候
            if (province.equals(city)) {
                System.out.println("手机号码归属地为：" + city);
                System.out.println("号码的邮政编码为：" + areacode);
                System.out.println("号码附属公司：" + company);
            } else {
                System.out.println("手机号码归属地为：" + province + " " + city);
                System.out.println("号码的邮政编码为：" + areacode);
                System.out.println("号码附属公司：" + company);
            }
        } else {
            System.out.println("请输入正确的手机号码");
        }*/
    }


}

