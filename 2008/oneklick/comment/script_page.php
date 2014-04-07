<?php
include('conn.php');
if(isset($_GET['delete']))
{
	$del = "delete from comments where id=".$_REQUEST['id'];
	mysql_query($del) or die(mysql_error());
	echo "<font size='3' color='#3333FF'><b>comment deleted successfully....!</b></font>";
}
else
{
	$insert = "insert into comments(parentId,name,email,comment) values(0,'".$_GET['val1']."','".$_GET['val2']."','".$_GET['val3']."')";
	mysql_query($insert) or die(mysql_error());
	echo "<font size='3' color='#3333FF'><b>comment added successfully....!</b></font>";
}
	$select = "select * from comments";
	$res = mysql_query($select);

?>
	<table class="sofT" cellspacing="0" border="1">
	<tr>
		<td colspan="5" class="helpHed" align="center">Comments Posted By Users</td>
	</tr>
	<tr>
	   <td class='helpHed'>Sr No.</td>
	   <td class='helpHed'>Name</td>
	   <td class='helpHed'>Email</td>
	   <td class='helpHed'>Comment</td>
   	   <td class='helpHed'>Delete</td>
    </tr>
<?php

	if(mysql_num_rows($res) > 0)
	{
		while($data=mysql_fetch_array($res))
		{ 
			echo "<tr class='sofT'>
				  <td class='soft'>".$data['id']."</td>
				  <td class='sup'>".$data['name']."</td>
				  <td class='sup'>".$data['email']."</td>
				  <td class='sup'>".$data['comment']."</td>

				  <td class='sup'>
						<input type='image' src='Images/images22.jpg' border='0' onMouseUp=getScriptPage('output_div','text_content1','text_content2','text_content3','2','".$data['id']."')></td>
			     </tr>";
		}
	}

?>