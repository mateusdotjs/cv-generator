import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  list: {
    display: "flex",
    flexDirection: "column",
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    gap: "4px",
  },
});

export function htmlToPdf(html: string) {
  // console.log("HTML recebido:", html);

  const doc = new DOMParser().parseFromString(html, "text/html");
  // console.log(doc.body.childNodes);

  // Array.from(doc.body.childNodes).forEach((node: any, i) => {
  //   console.log(`Nó ${i}:`, node.nodeName, node.textContent);
  // });

  return Array.from(doc.body.childNodes).map((node: any, i: number) =>
    render(node, i)
  );
}

function render(node: any, index?: number): any {
  if (node.nodeType === 3) {
    return node.textContent;
  }

  switch (node.nodeName.toLowerCase()) {
    case "p":
      return (
        <Text key={index} style={{ marginBottom: 8 }}>
          {Array.from(node.childNodes).map((child: any, i: number) =>
            render(child, i)
          )}
        </Text>
      );

    case "strong":
      return (
        <Text key={index} style={{ fontWeight: "700" }}>
          {Array.from(node.childNodes).map((child: any, i: number) =>
            render(child, i)
          )}
        </Text>
      );

    case "em":
      return (
        <Text key={index} style={{ fontStyle: "italic" }}>
          {Array.from(node.childNodes).map((child: any, i: number) =>
            render(child, i)
          )}
        </Text>
      );

    case "ul":
      return (
        <View key={index} style={styles.list}>
          {Array.from(node.childNodes).map((child: any, i: number) =>
            render(child, i)
          )}
        </View>
      );

    case "li":
      return (
        <View key={index} style={styles.listItem}>
          <Text>•</Text>
          <Text>
            {Array.from(node.childNodes).map((child: any, i: number) =>
              render(child, i)
            )}
          </Text>
        </View>
      );
  }
}
