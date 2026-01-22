function FindProxyForURL(url, host) {
    // 1. BYPASS: Files.com (Essential)
    // Prevents "Circular Logic" where the Chromebook can't get the PAC file
    // because it's trying to use the proxy that it hasn't learned about yet.
    if (dnsDomainIs(host, "highlandcentral.hosted-by-files.com") || 
        dnsDomainIs(host, "files.com")) {
        return "DIRECT";
    }

    // 2. BYPASS: Local Network (When at school)
    // If the device has a local school IP or is hitting a local hostname.
    if (isPlainHostName(host) || 
        isInNet(myIpAddress(), "10.0.0.0", "255.0.0.0")) {
        return "DIRECT";
    }

    // 3. BYPASS: VPN Tunnel (When connected)
    // If the student is at home and the VPN connects, they get an IP in your scope.
    // This allows the browser to actually reach the internet THROUGH the tunnel.
    if (isInNet(myIpAddress(), "10.40.248.0", "255.255.248.0")) {
        return "DIRECT";
    }

    // 4. THE KILL-SWITCH (The "Trap")
    // If none of the above match (i.e., at home with VPN off), force traffic to 
    // the firewall IP. Since 10.254.254.1 is unreachable at home, internet is blocked.
    return "PROXY 10.254.254.1:8080";
}
