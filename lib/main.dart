import 'package:flutter/material.dart';
import 'dart:js' as js;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: Column(
        children: [
          Text('koba'),
          Container(
            height: 300,
            width: 300,
            child: Row(
              children: [
                TextButton(
                    onPressed: () {
                      print("record Button");
                      js.context.callMethod('record');
                    },
                    child: Text('record')),
                TextButton(
                    onPressed: () => {js.context.callMethod('stop')},
                    child: Text('stop')),
              ],
            ),
            color: Colors.grey,
          ),
          Material(
            child: IconButton(
              onPressed: () => {
                js.context.callMethod("showAlert", ["This is alert message"])
                // js.context.callMethod("test")
              },
              icon: Icon(Icons.mic),
            ),
          )
        ],
      ),
    );
  }
}
