package co.apptailor.googlesignin;

import android.view.View;
import android.widget.Button;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.google.android.gms.common.SignInButton;

public class RNGoogleSigninButtonViewManager extends SimpleViewManager<SignInButton> {

    @Override
    public String getName() {
        return "RNGoogleSigninButton";
    }

    @Override
    protected SignInButton createViewInstance(final ThemedReactContext reactContext) {
        SignInButton button = new SignInButton(reactContext);
        button.setSize(SignInButton.SIZE_WIDE);
        button.setColorScheme(SignInButton.COLOR_DARK);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("RNGoogleSigninButtonClicked", null);
            }
        });
        Button root = (Button) button.getChildAt(0);
        root.setBackgroundDrawable(reactContext.getResources().getDrawable(R.drawable.common_google_signin_btn_text_dark_normal));
        return button;
    }

    @ReactProp(name = "size")
    public void setSize(SignInButton button, int size) {
        // button.setSize(size);
    }

    @ReactProp(name = "color")
    public void setColor(SignInButton button, int color) {
        // button.setColorScheme(color);
    }

    @ReactProp(name = "disabled")
    public void setDisabled(SignInButton button, boolean disabled) {
        // button.setEnabled(!disabled);
    }
}

