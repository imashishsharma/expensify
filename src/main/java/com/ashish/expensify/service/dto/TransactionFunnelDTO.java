package com.ashish.expensify.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the TransactionFunnel entity.
 */
public class TransactionFunnelDTO implements Serializable {

    private Long id;

    @NotNull
    private Double percentage;

    private Long transactionCategoryId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }

    public Long getTransactionCategoryId() {
        return transactionCategoryId;
    }

    public void setTransactionCategoryId(Long transactionCategoryId) {
        this.transactionCategoryId = transactionCategoryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TransactionFunnelDTO transactionFunnelDTO = (TransactionFunnelDTO) o;
        if(transactionFunnelDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transactionFunnelDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransactionFunnelDTO{" +
            "id=" + getId() +
            ", percentage=" + getPercentage() +
            "}";
    }
}
