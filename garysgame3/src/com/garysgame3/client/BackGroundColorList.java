package com.garysgame3.client;

//import com.google.gwt.core.client.EntryPoint;

import java.util.Map;

import java.util.HashMap;

import com.google.gwt.event.dom.client.ChangeEvent;
import com.google.gwt.event.dom.client.ChangeHandler;
import com.google.gwt.user.client.DOM;
import com.google.gwt.user.client.ui.ListBox;
//import com.google.gwt.user.client.ui.RootPanel;
import com.google.gwt.user.client.ui.RootPanel;

public class BackGroundColorList {
//public class BackGroundColorList implements EntryPoint {	
//  public void onModuleLoad() {
//    // Make a new list box, adding a few items to it.
//    ListBox lb = new ListBox();
//    lb.addItem("white");
//    lb.addItem("sunset");
//    lb.addItem("black");
//    lb.addItem("red");
//    lb.addItem("blue");
//    lb.addItem("gray");
//
//    // Make enough room for all five items (setting this value to 1 turns it
//    // into a drop-down list).
//    lb.setVisibleItemCount(6);
//
//    // Add it to the root panel.
////    RootPanel.get().add(lb);
//    RootPanel.get("fxButtonContainer").add(lb);
//  }
  private ListBox lb = new ListBox();
  private Map<Integer, String> colorMap = buildColorMap();
  public ListBox getColorList() {
    // Make a new list box, adding a few items to it.
    lb = new ListBox();
    lb.addItem(colorMap.get(0));
    lb.addItem(colorMap.get(1));
    lb.addItem(colorMap.get(2));
    lb.addItem(colorMap.get(3));
    lb.addItem(colorMap.get(4));
    lb.addItem(colorMap.get(5));
    lb.addItem(colorMap.get(6));

    // Make enough room for all five items (setting this value to 1 turns it
    // into a drop-down list).
    lb.setVisibleItemCount(1);
    
    // Add change listener event to change background to selected color
    lb.addChangeHandler(new ChangeHandler() {
		public void onChange(ChangeEvent event) {
			replaceBackGroundColor();
		}

		private void replaceBackGroundColor() {
			String backGround = "backGroundImage";
//			String backGround = "background-image";
			 int selectedIndex = lb.getSelectedIndex();
			 if (selectedIndex > -1) {
				 String mapValue = colorMap.get(selectedIndex);
				 if (mapValue.contains(".jpg")) {
					 String temp = "url('images/"+mapValue+"')";
					 //RootPanel.get().getElement().getStyle().setProperty("backGroundImage", temp);
					 DOM.setStyleAttribute(RootPanel.get().getElement(), backGround,"url('images/"+mapValue+"')"); 
					 DOM.setStyleAttribute(RootPanel.get("nEffectPanelContainer").getElement(), backGround,"url('images/"+mapValue+"')");
				 } else {
					 RootPanel.get().getElement().getStyle().setProperty("backgroundColor", mapValue);
					 RootPanel.get("nEffectPanelContainer").getWidget(0).getElement().getStyle().setProperty("backgroundColor", mapValue);
//					 RootPanel.get("nEffectPanelContainer").getElement().getStyle().setProperty("backgroundColor", mapValue);					 
				 }
			 //Window.alert("Something got selected " + listBox.getValue(selectedIndex));
			 }
		}
	});
	return lb;	  
  }
  private Map<Integer, String> buildColorMap() {
	colorMap = new HashMap<Integer, String>();
	colorMap.put(0, "#99CCFF");
	colorMap.put(1, "white");
	colorMap.put(2, "sunset.jpg");
	colorMap.put(3, "black");
	colorMap.put(4, "red");
	colorMap.put(5, "blue");
	colorMap.put(6, "gray");
	return colorMap;
  }
}
