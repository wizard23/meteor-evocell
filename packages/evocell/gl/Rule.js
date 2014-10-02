Rule = (function(glhelper) {
	// RulesTexture and Dishes brauchen gemeinsames Basisobjekt das eine Textur zurueckgibt, RuleTexture ist auch ein shader
	// public interface
	var Rule = function(reactor, ruleData)
	{
		this.reactor = reactor;
		this.gl = reactor.gl;
	
		this.setRule(ruleData);
	};

	Rule.prototype.setRule = function(ruleData)
	{
		this.ruleData = ruleData;

		if (ruleData.containsRule)
		{
			var xN = Math.ceil(ruleData.nrNeighbours/2);
			var yN = Math.floor(ruleData.nrNeighbours/2);
			var width = Math.pow(ruleData.nrStates, xN);
			var height = Math.pow(ruleData.nrStates, yN);

			this.nrStates = ruleData.nrStates;
			this.ruleTexture  = glhelper.createAlphaTexture(this.gl, width, height, ruleData.ruleTable);	

			this.width = width;
			this.height = height;

			this.invalidateProgram();
		}

		if (ruleData.containsPattern) 
		{
			this.patternTexture  = glhelper.createAlphaTexture(this.gl, 
				ruleData.patternWidth, ruleData.patternHeight, ruleData.patternData);
		}
	};

	Rule.prototype.getPatternTexture = function() {
		return this.patternTexture;
	};


	Rule.prototype.getTexture = function()
	{
		return this.ruleTexture;
	};

	Rule.prototype.getProgram = function() 
	{
		if (this.program == null)
		{
			if (this.ruleData == null)
			{
				throw "You have to call setRule to compile a shader";
			}

      var ruleShaderSrc = getFragmentShaderSourceFromEvoCellData(this.gl, this.ruleData);
			this.program = this.reactor.compileShader(ruleShaderSrc);
		}
	
		return this.program;
	}

	// private

	Rule.prototype.invalidateProgram = function() 
	{
		this.program = null;
	}
	
//////////////////////////////////////////////////////////
// Static functions
//////////////////////////////////////////////////////////

	var EvoCellFragmentShaderTemplate = 
	"#ifdef GL_ES\n" +
	"precision highp float;\n" +
	"#endif\n" +
	"  uniform sampler2D texFrame;\n" +
	"  uniform sampler2D texRule;\n" +
  "  uniform float XRES;\n" +
  "  uniform float YRES;\n" +
	"  \n" +
	"  varying vec2 vTexCoord;\n" +
	//"  const float dx = 1./%XRES%., dy=1./%YRES%.;\n" +
	"  const float stateScale = 255.;\n" +
	"  const float states = %STATES%.;\n" +
	"  const float width = %WIDTH%, height = %HEIGHT%;\n" +
	"  \n" +
	"  \n" +
	"void main(void) {\n" +
  " float dx = 1./XRES; float dy = 1./YRES;\n" +
	"	float v; \n" +
	"	float idx = 0.;\n" +
	"   %XBLOCK% \n" +
	"    \n" +
	"   float idy = 0.;\n" +
	"   %YBLOCK% \n" +
	"    \n" +
	"   vec2 vvvv=vec2(0.5/width + idx*stateScale/width, 0.5/height + idy*stateScale/height); \n" +
	"	vec4 lookup = 	texture2D(texRule, vvvv);\n" +
	"	gl_FragColor =  vec4(0, 0., 0., lookup.a);\n" +
	//"   gl_FragColor = vec4(0, 0., vTexCoord.x, vTexCoord.y);\n" +
	"}";

	var getFragmentShaderSourceFromEvoCellData = function(gl, evoCellData, xres, yres)
	{
		var xblock = "";
		var yblock = "";
		var nInXBlock = Math.ceil(evoCellData.nrNeighbours/2);
		var vget = "";
		var multiplier = "";
		var widthExpr = "";
		var heightExpr = "";
	
		for (var nIndex = 0; nIndex < evoCellData.neighbourhood.length; nIndex++)
		{
			var neighbour = evoCellData.neighbourhood[nIndex];
		
			vget = "v = texture2D(texFrame, vTexCoord + vec2(" + neighbour[0] + ".*dx, " + neighbour[1] + ".*dy)).a;\n";
		
		
			if (nIndex < nInXBlock)
			{	
				xblock += vget;
				xblock += "idx += " + multiplier + "v;\n";
			
				if (widthExpr != "")
					widthExpr += "*";
				widthExpr += "states";
			}
			else
			{
				yblock += vget;
				yblock += "idy += " + multiplier + "v;\n";
			
				if (heightExpr != "")
					heightExpr += "*";
				heightExpr += "states";
			}
		
			if (nIndex == nInXBlock-1)
				multiplier = "";
			else
				multiplier += "states*";
		}
	
		var shaderSource = EvoCellFragmentShaderTemplate;
		shaderSource = shaderSource.replace("%STATES%", evoCellData.nrStates);
		shaderSource = shaderSource.replace("%XRES%", xres); // width of the state texture
		shaderSource = shaderSource.replace("%YRES%", yres); // height of the state texture
		shaderSource = shaderSource.replace("%WIDTH%", widthExpr); 	 // width of the rule texture
		shaderSource = shaderSource.replace("%HEIGHT%", heightExpr); // height of the rule texture
		shaderSource = shaderSource.replace("%XBLOCK%", xblock);
		shaderSource = shaderSource.replace("%YBLOCK%", yblock);

		//alert(shaderSource);
		return shaderSource;
	}



	return Rule;
})(GLHelper);
