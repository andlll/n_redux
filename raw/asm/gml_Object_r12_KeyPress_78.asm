// gml_Object_r12_KeyPress_78  locals=2 args=0 len=176
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v noemi
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20C98FC
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 161
00000060: conv.i.v
00000064: call action_if_number(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20C98FC
00000084: push.v noemi
0000008C: push.imm.e 1
00000090: add.i.v
00000094: pop.v.v noemi
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: call action_set_relative(argc=1)
000000AC: popz