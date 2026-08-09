// gml_Object_impa32f_Step_0  locals=2 args=0 len=228
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 125
00000018: pushenv 0x214275C
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 1
00000028: conv.i.v
0000002C: push.v play
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x214275C
00000054: b 0x2142764
00000058: popenv 0x4142720
0000005C: b 0x2142768
00000060: popenv 0x1D42764
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x21427C0
00000074: push.imm.e 156
00000078: pushenv 0x2142798
0000007C: push.v ele
00000084: push.imm.e -2
00000088: add.i.v
0000008C: pop.v.v ele
00000094: popenv 0x4142780
00000098: push.imm.e 156
0000009C: pushenv 0x21427BC
000000A0: push.v mon
000000A8: push.imm.e -2
000000AC: add.i.v
000000B0: pop.v.v mon
000000B8: popenv 0x41427A4
000000BC: push.d 0.7
000000C8: pop.v.d image_alpha
000000D0: push.imm.e 0
000000D4: conv.i.v
000000D8: call action_set_relative(argc=1)
000000E0: popz