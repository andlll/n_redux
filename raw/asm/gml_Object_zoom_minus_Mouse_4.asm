// gml_Object_zoom_minus_Mouse_4  locals=2 args=0 len=264
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: push.d 1.4
00000014: conv.d.v
00000018: push.global.v global.sca
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x21E571C
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 4
0000004C: conv.i.v
00000050: push.builtin.v os_type
00000058: call action_if_variable(argc=3)
00000060: pop.v.v local.__b__
00000068: push.local.v local.__b__
00000070: conv.v.b
00000074: bf 0x21E571C
00000078: push.imm.e 1
0000007C: pop.v.i active
00000084: push.imm.e 1
00000088: conv.i.v
0000008C: push.d 1.4
00000098: conv.d.v
0000009C: push.global.v global.sca
000000A4: call action_if_variable(argc=3)
000000AC: pop.v.v local.__b__
000000B4: push.local.v local.__b__
000000BC: conv.v.b
000000C0: bf 0x21E57A0
000000C4: push.imm.e 0
000000C8: conv.i.v
000000CC: push.imm.e 0
000000D0: conv.i.v
000000D4: push.builtin.v os_type
000000DC: call action_if_variable(argc=3)
000000E4: pop.v.v local.__b__
000000EC: push.local.v local.__b__
000000F4: conv.v.b
000000F8: bf 0x21E57A0
000000FC: push.imm.e 1
00000100: pop.v.i active