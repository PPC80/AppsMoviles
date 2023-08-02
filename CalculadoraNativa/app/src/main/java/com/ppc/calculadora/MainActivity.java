package com.ppc.calculadora;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.GridLayout;
import android.widget.ImageButton;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;

public class MainActivity extends AppCompatActivity {

    private TextView textViewDisplay;
    private StringBuilder currentExpression;
    private CheckBox checkBoxRadians;
    private RadioGroup radioGroupTrigFunctions;
    private Spinner spinnerTrigFunctions;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textViewDisplay = findViewById(R.id.textViewDisplay);
        currentExpression = new StringBuilder();
        checkBoxRadians = findViewById(R.id.checkBoxRadians);
        radioGroupTrigFunctions = findViewById(R.id.radioGroupTrigFunctions);
        spinnerTrigFunctions = findViewById(R.id.spinnerTrigFunctions);

        // Set click listeners for all the buttons
        setButtonClickListener(R.id.button0);
        setButtonClickListener(R.id.button1);
        setButtonClickListener(R.id.button2);
        setButtonClickListener(R.id.button3);
        setButtonClickListener(R.id.button4);
        setButtonClickListener(R.id.button5);
        setButtonClickListener(R.id.button6);
        setButtonClickListener(R.id.button7);
        setButtonClickListener(R.id.button8);
        setButtonClickListener(R.id.button9);

        setButtonClickListener(R.id.buttonOpenParenthesis);
        setButtonClickListener(R.id.buttonCloseParenthesis);

        setButtonClickListener(R.id.buttonClear);
        setButtonClickListener(R.id.buttonAdd);
        setButtonClickListener(R.id.buttonSubtract);
        setButtonClickListener(R.id.buttonMultiply);
        setButtonClickListener(R.id.buttonDivide);
        setButtonClickListener(R.id.buttonEquals);

        // Populate the trigonometric functions in the spinner
        ArrayAdapter<CharSequence> trigFunctionsAdapter = ArrayAdapter.createFromResource(
                this,
                R.array.trig_functions_array,
                android.R.layout.simple_spinner_item
        );
        trigFunctionsAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerTrigFunctions.setAdapter(trigFunctionsAdapter);

        // Set listeners for the spinner, checkboxes, and radio buttons
        spinnerTrigFunctions.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                // Handle selected trigonometric function from the spinner
                String selectedFunction = parent.getItemAtPosition(position).toString();
                // Implement your logic for trigonometric functions here
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                // Do nothing
            }
        });

        // Handle switching between Radians and Degrees mode
        checkBoxRadians.setOnCheckedChangeListener((buttonView, isChecked) -> {
            // Implement your logic to handle Radians/Degrees mode
        });

        // Handle switching between Normal and Inverse trigonometric functions
        radioGroupTrigFunctions.setOnCheckedChangeListener((group, checkedId) -> {
            // Implement your logic to handle Normal/Inverse trigonometric functions
        });
    }

    private void setButtonClickListener(int buttonId) {
        ImageButton button = findViewById(buttonId);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onButtonClick(buttonId);
            }
        });
    }

    private void onButtonClick(int buttonId) {
        if (buttonId == R.id.button0) {
            currentExpression.append("0");
        } else if (buttonId == R.id.button1) {
            currentExpression.append("1");
        } else if (buttonId == R.id.button2) {
            currentExpression.append("2");
        } else if (buttonId == R.id.button3) {
            currentExpression.append("3");
        } else if (buttonId == R.id.button4) {
            currentExpression.append("4");
        } else if (buttonId == R.id.button5) {
            currentExpression.append("5");
        } else if (buttonId == R.id.button6) {
            currentExpression.append("6");
        } else if (buttonId == R.id.button7) {
            currentExpression.append("7");
        } else if (buttonId == R.id.button8) {
            currentExpression.append("8");
        } else if (buttonId == R.id.button9) {
            currentExpression.append("9");
        } else if (buttonId == R.id.buttonOpenParenthesis) {
            currentExpression.append("(");
        } else if (buttonId == R.id.buttonCloseParenthesis) {
            currentExpression.append(")");
        } else if (buttonId == R.id.buttonClear) {
            currentExpression.setLength(0);
        } else if (buttonId == R.id.buttonAdd) {
            currentExpression.append("+");
        } else if (buttonId == R.id.buttonSubtract) {
            currentExpression.append("-");
        } else if (buttonId == R.id.buttonMultiply) {
            currentExpression.append("*");
        } else if (buttonId == R.id.buttonDivide) {
            currentExpression.append("/");
        } else if (buttonId == R.id.buttonEquals) {
            evaluateExpression();
        }
        textViewDisplay.setText(currentExpression.toString());
    }

    private void evaluateExpression() {
        try {
            // Implement your logic to evaluate the currentExpression
            // You can use a mathematical expression parser or an expression evaluation library.
            // For this example, we'll use a simple Toast to display the result.
//            String result = "Result: " + currentExpression.toString();
//            Toast.makeText(this, result, Toast.LENGTH_SHORT).show();
            ScriptEngineManager manager = new ScriptEngineManager();
            ScriptEngine engine = manager.getEngineByName("js");

            // Evaluate the expression using the ScriptEngine
            String expression = currentExpression.toString();
            Object result = engine.eval(expression);

            // Display the result in the TextView
            textViewDisplay.setText(String.valueOf(result));
        } catch (Exception e) {
            // Handle any error during expression evaluation
            Toast.makeText(this, "Error: Invalid expression", Toast.LENGTH_SHORT).show();
        } finally {
            // Clear the currentExpression
            currentExpression.setLength(0);
        }
    }
}