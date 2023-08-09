package com.ppc.calculadora;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

public class MainActivity extends AppCompatActivity implements AdapterView.OnItemSelectedListener, View.OnClickListener {

    TextView resultado, resultadoTrigo;
    ImageButton btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9, btn0, btnMas, btnMenos, btnMulti, btnDiv, btnClear, btnIgual;
    RadioGroup radioGroup;
    RadioButton rbtnRad, rbtnGrad;
    CheckBox chkMostrar;
    LinearLayout layoutSpinner, layoutRbtns;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        chkMostrar = findViewById(R.id.chkMostrar);
        layoutSpinner = findViewById(R.id.layoutSpinner);
        layoutRbtns = findViewById(R.id.layoutRbtns);
        resultado = findViewById(R.id.txtResult);
        btn1 = findViewById(R.id.btn1);
        btn1.setOnClickListener(this);
        btn2 = findViewById(R.id.btn2);
        btn2.setOnClickListener(this);
        btn3 = findViewById(R.id.btn3);
        btn3.setOnClickListener(this);
        btn4 = findViewById(R.id.btn4);
        btn4.setOnClickListener(this);
        btn5 = findViewById(R.id.btn5);
        btn5.setOnClickListener(this);
        btn6 = findViewById(R.id.btn6);
        btn6.setOnClickListener(this);
        btn7 = findViewById(R.id.btn7);
        btn7.setOnClickListener(this);
        btn8 = findViewById(R.id.btn8);
        btn8.setOnClickListener(this);
        btn9 = findViewById(R.id.btn9);
        btn9.setOnClickListener(this);
        btn0 = findViewById(R.id.btn0);
        btn0.setOnClickListener(this);
        btnMas = findViewById(R.id.btnSuma);
        btnMas.setOnClickListener(this);
        btnMenos = findViewById(R.id.btnMenos);
        btnMenos.setOnClickListener(this);
        btnMulti = findViewById(R.id.btnMultiplicar);
        btnMulti.setOnClickListener(this);
        btnDiv = findViewById(R.id.btnDividir);
        btnDiv.setOnClickListener(this);
        btnClear = findViewById(R.id.btnClear);
        btnClear.setOnClickListener(this);
        btnIgual = findViewById(R.id.btnIgual);
        btnIgual.setOnClickListener(this);
        resultadoTrigo = findViewById(R.id.txtResultTrig);
        rbtnGrad = findViewById(R.id.rbtnGrados);
        rbtnRad = findViewById(R.id.rbtnRad);

        Spinner spinner = findViewById(R.id.spinner1);
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.funciones, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);
        spinner.setOnItemSelectedListener(this);

        if (chkMostrar.isChecked()) {
            layoutSpinner.setVisibility(View.VISIBLE);
            layoutRbtns.setVisibility(View.VISIBLE);
        } else {
            layoutSpinner.setVisibility(View.GONE);
            layoutRbtns.setVisibility(View.GONE);
        }

        chkMostrar.setOnCheckedChangeListener((buttonView, isChecked) -> {
            if (isChecked) {
                layoutSpinner.setVisibility(View.VISIBLE);
                layoutRbtns.setVisibility(View.VISIBLE);
            } else {
                layoutSpinner.setVisibility(View.GONE);
                layoutRbtns.setVisibility(View.GONE);
            }
        });
    }

    @Override
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
        String text = adapterView.getItemAtPosition(i).toString();
        if(text.equals("Sen")){
            resultadoTrigo.setText("Sen");
        } else if(text.equals("Cos")){
            resultadoTrigo.setText("Cos");
        } else if(text.equals("Tan")){
            resultadoTrigo.setText("Tan");
        } else if(text.equals("Asen")){
            resultadoTrigo.setText("Asen");
        } else if(text.equals("ACos")){
            resultadoTrigo.setText("Acos");
        } else if(text.equals("ATan")){
            resultadoTrigo.setText("ATan");
        } else if(text.equals("Raiz")){
            resultadoTrigo.setText("Raiz");
        }  else if(text.equals("Potencia ^2")){
            resultadoTrigo.setText("Potencia ^2");
        }
    }

    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {

    }

    @Override
    public void onClick(View view) {
        String numberText = view.getTag().toString();

        String numerosACalcular = resultado.getText().toString();

        if(numberText.equals("C")){
            resultado.setText("0");
            return;
        }



        if(numberText.equals("=")){
            String funcionTrigo = resultadoTrigo.getText().toString();
            if(!funcionTrigo.trim().isEmpty()){
                String expresion = "";

                if(rbtnGrad.isChecked()){
                    double grados = radAGrados(Double.parseDouble(numerosACalcular));
                    numerosACalcular = String.valueOf(grados);
                }

                switch (funcionTrigo) {
                    case "Sen":
                        expresion = "Math.sin(" + numerosACalcular + ")";
                        break;
                    case "Cos":
                        expresion = "Math.cos(" + numerosACalcular + ")";
                        break;
                    case "Tan":
                        expresion = "Math.tan(" + numerosACalcular + ")";
                        break;
                    case "ASen":
                        expresion = "Math.asin(" + numerosACalcular + ")";
                        break;
                    case "ACos":
                        expresion = "Math.acos(" + numerosACalcular + ")";
                        break;
                    case "ATan":
                        expresion = "Math.atan(" + numerosACalcular + ")";
                        break;
                    case "Raiz":
                        expresion = "Math.sqrt(" + numerosACalcular + ")";
                        break;
                    case "Potencia ^2":
                        expresion = "Math.pow(" + numerosACalcular + ", 2)";
                        break;
                }

                String finalResult = getResult(expresion);

                if(!finalResult.equals("Err")){
                    resultadoTrigo.setText("");
                    resultado.setText(finalResult);
                }
            }
            return;
        }

        numerosACalcular = numerosACalcular + numberText;
        resultado.setText(numerosACalcular);

        String finalResult = getResult(numerosACalcular);

        if(!finalResult.equals("Err")){
            resultado.setText(finalResult);
        }
    }

    public String getResult(String data){

        try{
            Context context = Context.enter();
            context.setOptimizationLevel(-1);
            Scriptable scriptable = context.initStandardObjects();
            String finalResult = context.evaluateString(scriptable, data, "Javascript", 1, null).toString();
            if(finalResult.endsWith(".0")){
                finalResult = finalResult.replace(".0", "");
            }
            if(finalResult.equals("Infinity")){
                Toast.makeText(MainActivity.this, "Error: Division por cero", Toast.LENGTH_SHORT).show();
            } else if(finalResult.equals("NaN")){
                Toast.makeText(MainActivity.this, "Error :(", Toast.LENGTH_SHORT).show();
            }
            return finalResult;
        } catch (Exception e){
            return "Err";
        }
    }

    public double radAGrados(double numero){
        numero = Math.toDegrees(numero);
        return numero;
    }
}