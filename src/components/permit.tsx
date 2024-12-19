import React, { useState } from "react";

const OrientationPermission: React.FC = () => {
  const [os, setOs] = useState<"iphone" | "android" | "pc">("pc");
  const [permissionGranted, setPermissionGranted] = useState<"pending" | "granted" | "denied">("pending");

  // OS判定
  const detectOSSimply = (): "iphone" | "android" | "pc" => {
    if (
      navigator.userAgent.indexOf("iPhone") > 0 ||
      navigator.userAgent.indexOf("iPad") > 0 ||
      navigator.userAgent.indexOf("iPod") > 0
    ) {
      return "iphone";
    } else if (navigator.userAgent.indexOf("Android") > 0) {
      return "android";
    }
    return "pc";
  };

  // iPhone用許可リクエスト
  const permitDeviceOrientationForSafari = async () => {
    try {
      const response = await (DeviceOrientationEvent as any).requestPermission();
      if (response === "granted") {
        setPermissionGranted("granted");
        alert("センサーの使用が許可されました。");
      } else {
        setPermissionGranted("denied");
        alert("センサーの許可が得られませんでした。");
      }
    } catch (error) {
      setPermissionGranted("denied");
      console.error("Device orientation permission denied:", error);
    }
  };

  // Android用許可処理
  const enableAndroidSensor = () => {
    setPermissionGranted("granted");
    alert("センサーの使用が有効化されました。");
  };

  // 初期化処理
  React.useEffect(() => {
    const osType = detectOSSimply();
    setOs(osType);
  }, []);

  return (
    <div>
      <h2>センサー使用許可</h2>
    
      {permissionGranted === "pending" ? (
        <div>
          <p>センサーの使用許可を取得してください。</p>
          {os === "iphone" ? (
            <button onClick={permitDeviceOrientationForSafari}>
              DeviceOrientationを許可する (iPhone)
            </button>
          ) : os === "android" ? (
            <button onClick={enableAndroidSensor}>
              センサーを有効にする (Android)
            </button>
          ) : (
            <p>PCでは対応していません。</p>
          )}
        </div>
      ) : permissionGranted === "granted" ? (
        <p>センサーの使用が許可されました。</p>
      ) : (
        <p>センサーの使用が拒否されました。</p>
      )}
    </div>
  );
};

export default OrientationPermission;