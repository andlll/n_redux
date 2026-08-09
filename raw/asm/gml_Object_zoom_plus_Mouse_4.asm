// gml_Object_zoom_plus_Mouse_4  locals=2 args=0 len=256
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.builtin.v os_type
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21E546C
00000038: push.imm.e 1
0000003C: conv.i.v
00000040: push.imm.e 1
00000044: conv.i.v
00000048: push.global.v global.sca
00000050: call action_if_variable(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: not.b.d
00000070: bf 0x21E546C
00000074: push.imm.e 1
00000078: pop.v.i active
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.imm.e 4
0000008C: conv.i.v
00000090: push.builtin.v os_type
00000098: call action_if_variable(argc=3)
000000A0: pop.v.v local.__b__
000000A8: push.local.v local.__b__
000000B0: conv.v.b
000000B4: bf 0x21E54EC
000000B8: push.imm.e 1
000000BC: conv.i.v
000000C0: push.imm.e 1
000000C4: conv.i.v
000000C8: push.global.v global.sca
000000D0: call action_if_variable(argc=3)
000000D8: pop.v.v local.__b__
000000E0: push.local.v local.__b__
000000E8: conv.v.b
000000EC: not.b.d
000000F0: bf 0x21E54EC
000000F4: push.imm.e 1
000000F8: pop.v.i active