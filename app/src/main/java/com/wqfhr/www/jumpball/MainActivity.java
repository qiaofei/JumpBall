package com.wqfhr.www.jumpball;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import org.xwalk.core.XWalkPreferences;
import org.xwalk.core.XWalkView;

public class MainActivity extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    XWalkView webView = (XWalkView) findViewById(R.id.xwallview);
    XWalkPreferences.setValue("enable-javascript", true);
    XWalkPreferences.setValue("allow-universal-access-from-file", true);
    XWalkPreferences.setValue("javascript-can-open-window", true);
    XWalkPreferences.setValue("support-multiple-windows", true);
    webView.addJavascriptInterface(this, "gw_globle_action");
    webView.load("file:///android_asset/elloripple/index.html", null);
  }

}
