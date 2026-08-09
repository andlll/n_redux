// gml_Object_hyperma_menu_Create_0  locals=2 args=0 len=152
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 4
0000000C: conv.i.v
00000010: push.builtin.v os_type
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x20BF250
00000038: push.imm.e 967
0000003C: push.imm.e -1
00000040: push.imm.e 0
00000044: pop.v.i obj0.view_xview[array]
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.builtin.v os_type
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20BF29C
00000084: push.imm.e 0
00000088: push.imm.e -1
0000008C: push.imm.e 0
00000090: pop.v.i obj0.view_xview[array]