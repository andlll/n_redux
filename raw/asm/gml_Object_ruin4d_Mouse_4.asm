// gml_Object_ruin4d_Mouse_4  locals=2 args=0 len=304
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x2139174
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 11
00000028: conv.i.v
0000002C: push.v selec
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x2139174
00000054: b 0x213917C
00000058: popenv 0x4139138
0000005C: b 0x2139180
00000060: popenv 0x1D3917C
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x2139238
00000074: push.imm.e 156
00000078: pushenv 0x21391D4
0000007C: push.imm.e 4
00000080: conv.i.v
00000084: push.imm.e 10000
00000088: conv.i.v
0000008C: push.v mon
00000094: call action_if_variable(argc=3)
0000009C: pop.v.v local.__b__
000000A4: push.local.v local.__b__
000000AC: conv.v.b
000000B0: bf 0x21391D4
000000B4: b 0x21391DC
000000B8: popenv 0x4139198
000000BC: b 0x21391E0
000000C0: popenv 0x1D391DC
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x2139238
000000D4: push.imm.e 156
000000D8: pushenv 0x2139210
000000DC: push.v mon
000000E4: push.imm.e -10000
000000E8: add.i.v
000000EC: pop.v.v mon
000000F4: popenv 0x41391F8
000000F8: push.imm.e 0
000000FC: conv.i.v
00000100: push.imm.e 0
00000104: conv.i.v
00000108: push.imm.e 593
0000010C: conv.i.v
00000110: call action_create_object(argc=3)
00000118: popz
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: call action_set_relative(argc=1)
0000012C: popz