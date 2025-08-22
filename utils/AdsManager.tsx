import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

class AdsManager {
  private static interstitial: InterstitialAd | null = null;
  private static isLoaded: boolean = false;

  private static adUnitId ='ca-app-pub-1261818971959382/3078022968'; // 👈 Replace with your real AdMob ID

  // Load an interstitial ad
  static loadAd(onLoaded?: () => void, onFailed?: (error: any) => void) {
    this.interstitial = InterstitialAd.createForAdRequest(this.adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    this.isLoaded = false;

    // Listener for ad loaded
    const unsubscribeLoaded = this.interstitial.addAdEventListener(AdEventType.LOADED, () => {
      this.isLoaded = true;
      onLoaded?.();
    });

    // Listener for ad error
    const unsubscribeError = this.interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
      this.interstitial = null;
      this.isLoaded = false;
      onFailed?.(error);
    });

    this.interstitial.load();

    // Return cleanup function
    return () => {
      unsubscribeLoaded();
      unsubscribeError();
    };
  }

  // Show the ad safely
  static showAd(onClosed?: () => void): boolean {
    if (this.interstitial && this.isLoaded) {
      // Listener for ad closed
      const unsubscribeClose = this.interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        this.interstitial = null;
        this.isLoaded = false;
        this.loadAd(); // Preload next ad
        onClosed?.();
        unsubscribeClose(); // Remove listener
      });

      this.interstitial.show();
      return true;
    } else {
      // Ad not ready; preload
      this.loadAd();
      return false;
    }
  }
}

export default AdsManager;

