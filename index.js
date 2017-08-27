var apiKey = config.APPID;

$('#btn').on('click', function(){
	var q = document.getElementById('input').value;
	var units = "imperial";
	console.log(q);
	$.ajax({
	url:'http://api.openweathermap.org/data/2.5/weather?q='+ q+ '&units='+ units+ '&APPID=' + apiKey,
	type:'GET',
	crossDomain: true
	}).done(function(data)
	{
	console.log(data);
	if  ($('#results').children().length > 0)
		{
			var resultDiv = document.getElementById('results');
			while(resultDiv.firstChild)
			{
				resultDiv.removeChild(resultDiv.firstChild);
			}
		}
	$('#results').append('<img id="img-weather" class="response img-fluid" src=http://openweathermap.org/img/w/' + data.weather[0].icon+ ".png" +'>');
	$('#results').append('<p class="response"><span><strong>MAX:</strong></span>' + data.main.temp_max + '</p>');
	$('#results').append('<p class="response"><span><strong>MIN:</strong></span>' + data.main.temp_min +'</p>');
	$('#results').append('<p class="response"><span><strong>MAIN:</strong></span>' + data.weather[0].main +'</p>');
	});
});

