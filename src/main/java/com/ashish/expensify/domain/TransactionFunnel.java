package com.ashish.expensify.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TransactionFunnel.
 */
@Entity
@Table(name = "transaction_funnel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TransactionFunnel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "percentage", nullable = false)
    private Double percentage;

    @OneToOne
    @JoinColumn(unique = true)
    private TransactionCategory transactionCategory;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPercentage() {
        return percentage;
    }

    public TransactionFunnel percentage(Double percentage) {
        this.percentage = percentage;
        return this;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }

    public TransactionCategory getTransactionCategory() {
        return transactionCategory;
    }

    public TransactionFunnel transactionCategory(TransactionCategory transactionCategory) {
        this.transactionCategory = transactionCategory;
        return this;
    }

    public void setTransactionCategory(TransactionCategory transactionCategory) {
        this.transactionCategory = transactionCategory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TransactionFunnel transactionFunnel = (TransactionFunnel) o;
        if (transactionFunnel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transactionFunnel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransactionFunnel{" +
            "id=" + getId() +
            ", percentage=" + getPercentage() +
            "}";
    }
}
