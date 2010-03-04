package com.garysgame3.client;

import java.util.ArrayList;
import java.util.List;

import org.adamtacy.client.ui.NEffectPanel;
import org.adamtacy.client.ui.effects.impl.Fade;
import org.adamtacy.client.ui.effects.impl.Resize;
import org.adamtacy.client.ui.effects.impl.SlideRight;
import org.adamtacy.client.ui.effects.transitionsphysics.EaseInOutTransitionPhysics;
import org.adamtacy.client.ui.effects.transitionsphysics.ElasticTransitionPhysics;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.event.dom.client.KeyCodes;
import com.google.gwt.event.dom.client.KeyUpEvent;
import com.google.gwt.event.dom.client.KeyUpHandler;
import com.google.gwt.user.client.rpc.AsyncCallback;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.Image;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.RootPanel;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.VerticalPanel;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class GarysGame3 implements EntryPoint {
	private final Button closeButton = new Button("Close");
	private final Button sendButton = new Button("Send");
	private final Button fxButton = new Button("FXtest");
	private final TextBox lastNameField = new TextBox();
	private final TextBox firstNameField = new TextBox();
	private final Label textToServerLabel = new Label();
	private final HTML serverResponseLabel = new HTML();
	private final DialogBox dialogBox = new DialogBox();
	private List<Image> imageList = buildImageList();
	private NEffectPanel thePanel = createNEffectPanel(imageList.get(0));
	private int currentImageIndex = 0;
	/**
	 * The message displayed to the user when the server cannot be reached or
	 * returns an error.
	 */
	private static final String SERVER_ERROR = "An error occurred while "
			+ "attempting to contact the server. Please check your network "
			+ "connection and try again.";

	/**
	 * Create a remote service proxy to talk to the server-side Greeting service.
	 */
	private final GreetingServiceAsync greetingService = GWT
			.create(GreetingService.class);

	/**
	 * This is the entry point method.
	 */
	public void onModuleLoad() {
		final Image stickFigure = new Image("images/stickFigureOpaque.png");
		final Image sunset = new Image("images/Sunset.jpg");
//		final Image twitterPic = new Image("images/twitterPic.jpg");
//		final Image faaBday = new Image("images/FAA_B-Day.jpg");
		lastNameField.setText("Your Last Name");
		lastNameField.setTitle("Last Name");
		firstNameField.setText("Your First Name");
		firstNameField.setTitle("First Name");

		// We can add style names to widgets
		sendButton.addStyleName("sendButton");
		fxButton.addStyleName("fxButton");
		
		// Set the background of the RootPanel
        RootPanel.get().getElement().getStyle().setProperty("backgroundColor", "#99CCFF");
        //RootPanel.get().getElement().getStyle().setProperty("backGroundImage", "images/Sunset.jpg");
        
		// Add the nameField and sendButton to the RootPanel
		// Use RootPanel.get() to get the entire body element
		RootPanel.get("nameFieldContainer").add(lastNameField);
		RootPanel.get("nameFieldContainer").add(firstNameField);
		RootPanel.get("sendButtonContainer").add(sendButton);
		RootPanel.get("fxButtonContainer").add(fxButton);
		RootPanel.get("stickFigureContainer").add(stickFigure);

		// Focus the cursor on the name field when the app loads
		lastNameField.setFocus(true);
		lastNameField.selectAll();
		
		// Focus the cursor on the fxButton when the app loads
		fxButton.setFocus(true);
		
		// Create the popup dialog box
		createPopupDialogBox();
		// Create the fx popup dialog box
//		final DialogBox fxDialogBox = new DialogBox();
//		createFxPopupDialogBox(fxDialogBox);
//		NEffectPanel thePanel = createNEffectPanel();
//		final NEffectPanel thePanel = createNEffectPanel(imageList.get(0));
		RootPanel.get("nEffectPanelContainer").add(thePanel);
//		thePanel.playEffects(2, 250, 1);
		thePanel.playEffects();

//		replaceImageRerunAnimation(faaBday, thePanel);
		// Add a handler to replace the picture and rerun the animation
		fxButton.addClickHandler(new ClickHandler() {
			public void onClick(ClickEvent event) {
				replaceImageRerunAnimation();
			}
		});
		
//		ClickItHandler handler = new ClickItHandler();
//		thePanel.addEffect(theEffect)
		
		// Add a handler to send the name to the server
		MyHandler handler = new MyHandler();
		sendButton.addClickHandler(handler);
		lastNameField.addKeyUpHandler(handler);
		firstNameField.addKeyUpHandler(handler);
	}

	private List<Image> buildImageList() {
		imageList = new ArrayList<Image>();
		imageList.add(new Image("images/twitterPic.jpg"));
		imageList.add(new Image("images/FAA_B-Day.jpg"));
		return imageList;
	}

	private void replaceImageRerunAnimation() {
//		Image currentImage = thePanel.get(twitterPic);
//		garysImageWidget will need to override hashcode & equals for id field.
		RootPanel.get("nEffectPanelContainer").remove(thePanel);
		thePanel = createNEffectPanel(getNextImage());
		RootPanel.get("nEffectPanelContainer").add(thePanel);
		thePanel.playEffects();
	}

	private Image getNextImage() {
		Image image = null;
		for (int i=0; i < imageList.size(); i++) {
			if (i != currentImageIndex) {
				image = imageList.get(i);
				currentImageIndex = i;
				break;
			}
		}
		return image;
	}

	private NEffectPanel createNEffectPanel(Image image) {
		NEffectPanel thePanel = new NEffectPanel();
		thePanel.getElement().getStyle().setProperty("backgroundColor", "#99CCFF");
//		thePanel.setPixelSize(750, 200);
//		thePanel.add(sunset);
		thePanel.add(image);
		Fade fade = new Fade();
		fade.setStartOpacity(5);
		fade.setEndOpacity(100);
		thePanel.addEffect(fade);
//		thePanel.addEffect(new Puff());
		thePanel.addEffect(new SlideRight());
//		Resize theResize = new Resize(250, 50);
//		thePanel.addEffect(theResize);
		ElasticTransitionPhysics tp = new ElasticTransitionPhysics(6.5, 2);
		tp.chainTransitionPhysicsBefore(new EaseInOutTransitionPhysics()); 
		thePanel.setEffectsTransitionType(tp);
		return thePanel;	
	}

	private DialogBox createFxPopupDialogBox(final DialogBox fxDialogBox) {
		fxDialogBox.setText("Test FX Functionality");
		fxDialogBox.setAnimationEnabled(true);
		
		final Button closeButton = new Button("Close");
		closeButton.getElement().setId("closeButton");
		// Add a handler to close the DialogBox
		closeButton.addClickHandler(new ClickHandler() {
			public void onClick(ClickEvent event) {
				fxDialogBox.hide();
			}
		});
		
		NEffectPanel thePanel = new NEffectPanel();
		thePanel.add(new Image("images/Sunset.jpg")); 
		thePanel.addEffect(new Resize());
		
		fxDialogBox.add(thePanel);
		fxDialogBox.add(closeButton);
		
		thePanel.playEffects();
		return fxDialogBox;
		
	}
	private DialogBox createPopupDialogBox() {
		dialogBox.setText("Remote Procedure Call");
		dialogBox.setAnimationEnabled(true);
		
		// We can set the id of a widget by accessing its Element
		closeButton.getElement().setId("closeButton");
		
		VerticalPanel dialogVPanel = new VerticalPanel();
		dialogVPanel.addStyleName("dialogVPanel");
		dialogVPanel.add(new HTML("<b>Sending name to the server:</b>"));
		dialogVPanel.add(textToServerLabel);
		dialogVPanel.add(new HTML("<br><b>Server replies:</b>"));
		dialogVPanel.add(serverResponseLabel);
		dialogVPanel.setHorizontalAlignment(VerticalPanel.ALIGN_RIGHT);
		dialogVPanel.add(closeButton);
		dialogBox.setWidget(dialogVPanel);
		
		// Add a handler to close the DialogBox
		closeButton.addClickHandler(new ClickHandler() {
			public void onClick(ClickEvent event) {
				dialogBox.hide();
				sendButton.setEnabled(true);
				sendButton.setFocus(true);
			}
		});
		
		return dialogBox;
	}

	// Create a handler for the sendButton and nameField
	class ClickItHandler implements ClickHandler, KeyUpHandler {
		/**
		 * Fired when the user clicks on the sendButton.
		 */
		public void onClick(ClickEvent event) {
//			thePanel.playEffects();
		}

		/**
		 * Fired when the user types in the nameField.
		 */
		public void onKeyUp(KeyUpEvent event) {
			if (event.getNativeKeyCode() == KeyCodes.KEY_ENTER) {
//				thePanel.playEffects();
			}
		}
	}
	
	// Create a handler for the sendButton and nameField
	class MyHandler implements ClickHandler, KeyUpHandler {
		/**
		 * Fired when the user clicks on the sendButton.
		 */
		public void onClick(ClickEvent event) {
			sendNameToServer();
		}

		/**
		 * Fired when the user types in the nameField.
		 */
		public void onKeyUp(KeyUpEvent event) {
			if (event.getNativeKeyCode() == KeyCodes.KEY_ENTER) {
				sendNameToServer();
			}
		}

		/**
		 * Send the name from the nameField to the server and wait for a response.
		 */
		//Button sendButton, final Button closeButton, TextBox nameField,
		//Label textToServerLabel, final HTML serverResponseLabel, final DialogBox dialogBox
		private void sendNameToServer() {
			sendButton.setEnabled(false);
			String textToServer = firstNameField.getText() + " " + lastNameField.getText();
			textToServerLabel.setText(textToServer);
			serverResponseLabel.setText("");
			greetingService.greetServer(textToServer,
					new AsyncCallback<String>() {
						public void onFailure(Throwable caught) {
							// Show the RPC error message to the user
							dialogBox
									.setText("Remote Procedure Call - Failure");
							serverResponseLabel
									.addStyleName("serverResponseLabelError");
							serverResponseLabel.setHTML(SERVER_ERROR);
							dialogBox.center();
							closeButton.setFocus(true);
						}

						public void onSuccess(String result) {
							dialogBox.setText("Remote Procedure Call");
							serverResponseLabel
									.removeStyleName("serverResponseLabelError");
							serverResponseLabel.setHTML(result);
							dialogBox.center();
							closeButton.setFocus(true);
						}
					});
		}
	}
}
