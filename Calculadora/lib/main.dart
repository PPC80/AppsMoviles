import 'package:flutter/material.dart';
import 'dart:math';

void main() {
  runApp(const CalculatorApp());
}

class CalculatorApp extends StatelessWidget {
  const CalculatorApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Calculator',
      theme: ThemeData(
        primarySwatch: Colors.purple,
      ),
      home: const CalculatorScreen(),
    );
  }
}

class CalculatorScreen extends StatefulWidget {
  const CalculatorScreen({super.key});

  @override
  State<CalculatorScreen> createState() => _CalculatorScreenState();
}

class _CalculatorScreenState extends State<CalculatorScreen> {
  String _inputValue = '';
  String _outputValue = '';
  String _sign = '';

  void _clear() {
    setState(() {
      _inputValue = '';
      _outputValue = '';
    });
  }

  void _appendToInput(String value) {
    if(value == "+"){
      _sign = "+";
    } else if (value == "-"){
      _sign = "-";
    } else if (value == "*"){
      _sign = "*";
    } else if (value == "/"){
      _sign = "/";
    }
    setState(() {
      _inputValue += value;
    });
  }

  void _calculate(String sign) {
    //double inputValue = double.parse(_inputValue);
    double result = 0;

    switch (sign) {
      case '+':
        List<String> values = _inputValue.split("+");
        String value1 = values[0];
        String value2 = values[1];

        result = double.parse(value1) + double.parse(value2);
        break;
      case '-':
        List<String> values = _inputValue.split("-");
        String value1 = values[0];
        String value2 = values[1];

        result = double.parse(value1) - double.parse(value2);
        break;
      case '*':
        List<String> values = _inputValue.split("*");
        String value1 = values[0];
        String value2 = values[1];

        result = double.parse(value1) * double.parse(value2);
        break;
      case '/':
        List<String> values = _inputValue.split("/");
        String value1 = values[0];
        String value2 = values[1];

        result = double.parse(value1) / double.parse(value2);
        break;
      default:
        result = 0;
        break;
    }

    setState(() {
      _outputValue = result.toString();
    });
  }

  void _applyTrigFunction(String functionName) {
    double inputValue = double.parse(_inputValue);
    double result;

    switch (functionName) {
      case 'sen':
        result = sin(inputValue);
        break;
      case 'cos':
        result = cos(inputValue);
        break;
      case 'tan':
        result = tan(inputValue);
        break;
      default:
        result = 0;
        break;
    }

    setState(() {
      _outputValue = result.toString();
    });
  }

  Widget _buildButton(String label, Color color, VoidCallback onPressed) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: ElevatedButton(
          onPressed: onPressed,
          style: ElevatedButton.styleFrom(
            backgroundColor: color,
          ),
          child: Text(
            label,
            style: const TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Calculator'),
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(
                    _inputValue,
                    style: const TextStyle(
                      fontSize: 36.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  Text(
                    _outputValue,
                    style: const TextStyle(
                      fontSize: 24.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Column(
              children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: <Widget>[
                    _buildButton('7', Colors.grey[300]!, () => _appendToInput('7')),
                    _buildButton('8', Colors.grey[300]!, () => _appendToInput('8')),
                    _buildButton('9', Colors.grey[300]!, () => _appendToInput('9')),
                    _buildButton('/', Colors.blue, () => _appendToInput('/')),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: <Widget>[
                    _buildButton('4', Colors.grey[300]!, () => _appendToInput('4')),
                    _buildButton('5', Colors.grey[300]!, () => _appendToInput('5')),
                    _buildButton('6', Colors.grey[300]!, () => _appendToInput('6')),
                    _buildButton('*', Colors.blue, () => _appendToInput('*')),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: <Widget>[
                    _buildButton('1', Colors.grey[300]!, () => _appendToInput('1')),
                    _buildButton('2', Colors.grey[300]!, () => _appendToInput('2')),
                    _buildButton('3', Colors.grey[300]!, () => _appendToInput('3')),
                    _buildButton('-', Colors.blue, () => _appendToInput('-')),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: <Widget>[
                    _buildButton('0', Colors.grey[300]!, () => _appendToInput('0')),
                    _buildButton('.', Colors.grey[300]!, () => _appendToInput('.')),
                    _buildButton('=', Colors.blue, () => _calculate(_sign)),
                    _buildButton('+', Colors.blue, () => _appendToInput('+')),
                  ],
                ),
                const SizedBox(height: 8.0),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: <Widget>[
                    _buildButton('sen', Colors.grey[300]!, () => _applyTrigFunction('sen')),
                    _buildButton('cos', Colors.grey[300]!, () => _applyTrigFunction('cos')),
                    _buildButton('tan', Colors.grey[300]!, () => _applyTrigFunction('tan')),
                    _buildButton('C', Colors.purple, () => _clear()),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
