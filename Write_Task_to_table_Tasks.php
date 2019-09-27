<?php
// Читать файл
	$f = fopen("Podkl.txt", "rt") or die("Ошибка!");
		for ($i=0; $data=fgetcsv($f,50,";"); $i++) 
			{
  				$num = count($data); 
  				for ($c=0; $c<$num; $c++)  
					$Parol_BD=$data[0];
					$Name_polzov=$data[1];
			}
		fclose($f);
		if($Parol_BD=="-1") 
			$Parol_BD="";

//  *************************   Конец чтения файла
	$error=1;
	$id="0";
	$done="0";
	$row=array();
	$Out= array();
	$edition_admin="0";																		// 0 - не отредактировано; 1 - отредактировано
	$Name_BD="uzlov_temio";
																		// ******************************************************************** Начало  **********************************	
	$Name_Table="tasks";	
			if(isset($_POST["Name_User"]))						$Name_User=$_POST["Name_User"];
			if(isset($_POST["E_Mail"]))								$E_Mail=$_POST["E_Mail"];
			if(isset($_POST["Task"]))									$Task=$_POST["Task"];
			if(isset($_POST["edition_admin"]))				$edition_admin=$_POST["edition_admin"];
			if(isset($_POST["done"]))								$done=$_POST["done"];
			if(isset($_POST["id"]))
				{					
					$id=$_POST["id"];
					$edition_admin="1";											//  отредактировано
				}
		$mysqli = new mysqli("localhost", $Name_polzov, $Parol_BD, $Name_BD);
		if ($mysqli->connect_errno)
 			{;}
		else 
			{	
				if($id!="0")
					$query="update $Name_Table set task='$Task', done='$done', edit_admin='$edition_admin' where id='$id'";
				else
					$query="insert into $Name_Table (name_user, e_mail, task, done, edit_admin) values('$Name_User', '$E_Mail', '$Task', '$done', '$edition_admin')";
						$result=mysqli_query($mysqli, $query);						
					echo $query;
						if($result)  $error=0;														// нет ошибок
							echo $error;	
				mysqli_close($mysqli); 
			}			
			
?>