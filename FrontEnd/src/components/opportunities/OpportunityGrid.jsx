import OpportunityCard from "./opportunityCard";

function OpportunityGrid({
  opportunities,
}) {
  if (!opportunities?.length) {
    return (
      <div className="empty-opportunities">
        <h3>
          ما لقينا فرص مطابقة
        </h3>

        <p>
          جرّب تغيير البحث أو الفلاتر.
        </p>
      </div>
    );
  }

  return (
    <div className="opportunity-grid">

      {opportunities.map(
        (opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
          />
        )
      )}

    </div>
  );
}

export default OpportunityGrid;