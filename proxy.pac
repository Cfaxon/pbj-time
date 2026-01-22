function FindProxyForURL(url, host) {
    if (dnsDomainIs(host, "bandg-files.github.io") || 
        dnsDomainIs(host, "github.io")) {
        return "DIRECT";
    }

    if (isPlainHostName(host) || 
        isInNet(myIpAddress(), "10.0.0.0", "255.0.0.0")) {
        return "DIRECT";
    }

    if (isInNet(myIpAddress(), "10.40.248.0", "255.255.248.0")) {
        return "DIRECT";
    }

    return "PROXY 10.254.254.1:8080";
}
