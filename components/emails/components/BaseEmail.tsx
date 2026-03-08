import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";

interface BaseEmailProps {
  preview: string;
  children: React.ReactNode;
}

export function BaseEmail({ preview, children }: BaseEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Heading style={styles.brand}>TECHNO BHARATI</Heading>
            <Text style={styles.brandSub}>2K26</Text>
          </Section>

          <Section style={styles.content}>{children}</Section>

          <Hr style={styles.hr} />
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              This is an automated message from Techno Bharati 2026. Please do
              not reply to this email.
            </Text>
            <Text style={styles.footerText}>
              Bharati Vidyapeeth's College of Engineering, Kolhapur
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <Row style={styles.infoRow}>
      <Column style={styles.infoLabel}>{label}</Column>
      <Column style={styles.infoValue}>{value}</Column>
    </Row>
  );
}

export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Section style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </Section>
  );
}

export function MemberBlock({
  role,
  name,
  email,
  contact,
  extra,
}: {
  role: string;
  name?: string;
  email?: string;
  contact?: string;
  extra?: { label: string; value: string }[];
}) {
  return (
    <Section style={styles.memberBlock}>
      <Text style={styles.memberRole}>{role}</Text>
      {name && <Text style={styles.memberName}>{name}</Text>}
      {email && <Text style={styles.memberDetail}>✉ {email}</Text>}
      {contact && <Text style={styles.memberDetail}>📞 {contact}</Text>}
      {extra?.map((e) => (
        <Text key={e.label} style={styles.memberDetail}>
          {e.label}: {e.value}
        </Text>
      ))}
    </Section>
  );
}

const styles = {
  body: {
    backgroundColor: "#f4f4f5",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    margin: 0,
    padding: "32px 0",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    maxWidth: "560px",
    margin: "0 auto",
    overflow: "hidden" as const,
  },
  header: {
    backgroundColor: "#09090b",
    padding: "28px 40px 24px",
    textAlign: "center" as const,
  },
  brand: {
    color: "#2dac5c",
    fontSize: "22px",
    fontWeight: "800",
    letterSpacing: "6px",
    margin: "0",
    textTransform: "uppercase" as const,
  },
  brandSub: {
    color: "#71717a",
    fontSize: "11px",
    letterSpacing: "4px",
    margin: "4px 0 0",
    textTransform: "uppercase" as const,
  },
  content: {
    padding: "32px 40px",
  },
  hr: {
    borderColor: "#f4f4f5",
    margin: "0 40px",
  },
  footer: {
    padding: "20px 40px 28px",
    textAlign: "center" as const,
  },
  footerText: {
    color: "#a1a1aa",
    fontSize: "11px",
    lineHeight: "1.6",
    margin: "0 0 4px",
  },
  card: {
    backgroundColor: "#fafafa",
    borderRadius: "8px",
    border: "1px solid #e4e4e7",
    padding: "16px 20px",
    marginBottom: "16px",
  },
  cardTitle: {
    color: "#71717a",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "2px",
    margin: "0 0 12px",
    textTransform: "uppercase" as const,
  },
  infoRow: {
    marginBottom: "6px",
  },
  infoLabel: {
    color: "#71717a",
    fontSize: "12px",
    width: "120px",
  },
  infoValue: {
    color: "#09090b",
    fontSize: "12px",
    fontWeight: "600",
  },
  memberBlock: {
    backgroundColor: "#ffffff",
    borderRadius: "6px",
    border: "1px solid #e4e4e7",
    padding: "12px 16px",
    marginBottom: "8px",
  },
  memberRole: {
    color: "#71717a",
    fontSize: "9px",
    fontWeight: "700",
    letterSpacing: "2px",
    margin: "0 0 6px",
    textTransform: "uppercase" as const,
  },
  memberName: {
    color: "#09090b",
    fontSize: "13px",
    fontWeight: "700",
    margin: "0 0 4px",
  },
  memberDetail: {
    color: "#52525b",
    fontSize: "12px",
    margin: "2px 0",
  },
};
