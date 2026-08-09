// gml_Object_upsign23_Mouse_10  locals=2 args=0 len=184
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v phase
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20F8488
0000004C: push.imm.e -50
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 657
00000060: conv.i.v
00000064: call action_create_object(argc=3)
0000006C: popz
00000070: push.imm.e 0
00000074: conv.i.v
00000078: call action_set_relative(argc=1)
00000080: popz
00000084: push.imm.e 1
00000088: pop.v.i phase
00000090: push.imm.e 1
00000094: conv.i.v
00000098: call action_set_relative(argc=1)
000000A0: popz
000000A4: push.imm.e 0
000000A8: conv.i.v
000000AC: call action_set_relative(argc=1)
000000B4: popz