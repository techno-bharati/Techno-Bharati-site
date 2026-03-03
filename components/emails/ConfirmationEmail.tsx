import { Heading, Section, Text } from "@react-email/components";
import { BaseEmail, Card, InfoRow, MemberBlock } from "./components/BaseEmail";
import { Prisma } from "@/prisma/generated/prisma/client";

type RegistrationWithRelation = Prisma.RegistrationGetPayload<{
  include: {
    teamLeader: true;
    teamMembers: true;
    players: true;
  };
}>;

interface ConfirmationEmailProps {
  registration: RegistrationWithRelation;
}

export function ConfirmationEmail({ registration }: ConfirmationEmailProps) {
  const eventName = registration.eventType.replace(/_/g, " ");

  const renderParticipants = () => {
    const isSquad =
      registration.squadName ||
      (Array.isArray(registration.players) && registration.players.length > 0);

    const isTeam =
      registration.teamName ||
      (Array.isArray(registration.teamMembers) &&
        registration.teamMembers.length > 0);

    if (isSquad) {
      return (
        <Card title={`Squad — ${registration.squadName}`}>
          {registration.players?.map((player: any, i: number) => (
            <MemberBlock
              key={i}
              role={i === 0 ? "Squad Leader" : `Player ${i + 1}`}
              name={player.playerName}
              email={i === 0 ? player.email : undefined}
              contact={player.contactNumber}
              extra={[{ label: "BGMI ID", value: player.bgmiId }]}
            />
          ))}
        </Card>
      );
    }

    if (isTeam) {
      return (
        <Card title={`Team — ${registration.teamName || "Team"}`}>
          {registration.startupCategory && (
            <InfoRow label="Category" value={registration.startupCategory} />
          )}
          {registration.studentName && (
            <MemberBlock
              role="Team Leader"
              name={registration.studentName ?? undefined}
              email={registration.email ?? undefined}
              contact={registration.contactNumber ?? undefined}
            />
          )}
          {registration.teamMembers?.map((member, i: number) => (
            <MemberBlock
              key={i}
              role={`Member ${i + 1}`}
              name={member.studentName}
              email={member.email ?? undefined}
              contact={member.contactNumber}
            />
          ))}
        </Card>
      );
    }

    return (
      <Card title="Participant">
        <MemberBlock
          role="Registered As"
          name={registration.studentName ?? undefined}
          email={registration.email ?? undefined}
          contact={registration.contactNumber ?? undefined}
        />
      </Card>
    );
  };

  return (
    <BaseEmail
      preview={`Registration confirmed for ${eventName} — Techno Bharati 2k26`}
    >
      <Section style={{ textAlign: "center", marginBottom: "28px" }}>
        <Text style={badge}>✓ Registration Confirmed</Text>
        <Heading style={heading}>You're In!</Heading>
        <Text style={subheading}>
          Your registration for <strong>{eventName}</strong> has been verified.
        </Text>
      </Section>

      <Card title="Event Details">
        <InfoRow label="Event" value={eventName} />
        <InfoRow label="College" value={registration.collegeName} />
        <InfoRow label="Department" value={registration.department} />
        <InfoRow label="Amount Paid" value={`₹${registration.amount}`} />
        <InfoRow
          label="Date"
          value={new Date(registration.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        />
        <InfoRow label="Payment Mode" value={registration.paymentMode} />
        {registration.paymentMode === "ONLINE" &&
          registration.transactionId && (
            <InfoRow
              label="Transaction ID"
              value={registration.transactionId}
            />
          )}
      </Card>

      {renderParticipants()}

      <Section style={noteBox}>
        <Text style={noteText}>
          Please keep this email as proof of your registration.
        </Text>
      </Section>
    </BaseEmail>
  );
}

const badge = {
  backgroundColor: "#dcfce7",
  color: "#16a34a",
  borderRadius: "99px",
  display: "inline-block",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "1px",
  padding: "4px 14px",
  margin: "0 0 16px",
  textTransform: "uppercase" as const,
};

const heading = {
  color: "#09090b",
  fontSize: "28px",
  fontWeight: "800",
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
  letterSpacing: "2px",
};

const subheading = {
  color: "#52525b",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
};

const noteBox = {
  backgroundColor: "#fefce8",
  borderRadius: "8px",
  border: "1px solid #fef08a",
  padding: "14px 18px",
  marginTop: "8px",
};

const noteText = {
  color: "#713f12",
  fontSize: "12px",
  lineHeight: "1.6",
  margin: "0",
};
