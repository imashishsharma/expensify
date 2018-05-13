package com.ashish.expensify.service.dto;


import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import javax.validation.constraints.NotNull;

/**
 * A DTO for the Transaction entity.
 */
public class TransactionDTO implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = -4498378480781442726L;

	private Long id;

    @NotNull
    private String transactionName;

    @NotNull
    private ZonedDateTime transactionDate;

    private ZonedDateTime createdDate;

    private ZonedDateTime modifiedDate;

    private Boolean delFlag;

    private String comment;

    private Long userId;

    private String userLogin;
    
    private Double amount;

    private Long transactionCategoryId;
    

    public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionName() {
        return transactionName;
    }

    public void setTransactionName(String transactionName) {
        this.transactionName = transactionName;
    }

    public ZonedDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(ZonedDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public ZonedDateTime getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(ZonedDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public Boolean isDelFlag() {
        return delFlag;
    }

    public void setDelFlag(Boolean delFlag) {
        this.delFlag = delFlag;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
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

        TransactionDTO transactionDTO = (TransactionDTO) o;
        if(transactionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transactionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

	@Override
	public String toString() {
		return "TransactionDTO [id=" + id + ", transactionName=" + transactionName + ", transactionDate="
				+ transactionDate + ", createdDate=" + createdDate + ", modifiedDate=" + modifiedDate + ", delFlag="
				+ delFlag + ", comment=" + comment + ", userId=" + userId + ", userLogin=" + userLogin + ", amount="
				+ amount + ", transactionCategoryId=" + transactionCategoryId + "]";
	}

   
}
