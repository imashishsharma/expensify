package com.ashish.expensify.service.mapper;

import com.ashish.expensify.domain.*;
import com.ashish.expensify.service.dto.TransactionCategoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TransactionCategory and its DTO TransactionCategoryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TransactionCategoryMapper extends EntityMapper<TransactionCategoryDTO, TransactionCategory> {



    default TransactionCategory fromId(Long id) {
        if (id == null) {
            return null;
        }
        TransactionCategory transactionCategory = new TransactionCategory();
        transactionCategory.setId(id);
        return transactionCategory;
    }
}
