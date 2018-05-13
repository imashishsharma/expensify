package com.ashish.expensify.service.mapper;

import com.ashish.expensify.domain.*;
import com.ashish.expensify.service.dto.TransactionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Transaction and its DTO TransactionDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, TransactionCategoryMapper.class})
public interface TransactionMapper extends EntityMapper<TransactionDTO, Transaction> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "transactionCategory.id", target = "transactionCategoryId")
    TransactionDTO toDto(Transaction transaction);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "transactionCategoryId", target = "transactionCategory")
    Transaction toEntity(TransactionDTO transactionDTO);

    default Transaction fromId(Long id) {
        if (id == null) {
            return null;
        }
        Transaction transaction = new Transaction();
        transaction.setId(id);
        return transaction;
    }
}
