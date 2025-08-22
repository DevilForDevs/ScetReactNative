# ----------------------------
# React Native Dev Support
# ----------------------------
-keep class com.facebook.react.** { *; }
-keep class com.facebook.react.devsupport.** { *; }
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.modules.** { *; }

# Keep annotation classes
-keep class androidx.annotation.** { *; }

# Keep classes referenced via reflection
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <methods>;
}

# Optional: Keep native modules
-keep @interface com.facebook.react.module.annotations.ReactModule

# ----------------------------
# Firebase / AdMob
# ----------------------------
-keep class com.google.android.gms.** { *; }
-keep class com.google.firebase.** { *; }

# OkHttp and Gson used by some Firebase SDKs
-keep class okhttp3.** { *; }
-keep class com.google.gson.** { *; }

# Avoid stripping Parcelable implementations used by ads
-keepclassmembers class * implements android.os.Parcelable {
  public static final android.os.Parcelable$Creator *;
}
