// gml_Object_puruspa_Step_0  locals=2 args=0 len=512
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.global.v global.sca
00000018: push.global.v global.sca
00000020: call action_sprite_transform(argc=4)
00000028: popz
0000002C: push.v obj140.x
00000034: push.v obj141.x
0000003C: sub.v.v
00000040: pop.v.v shifta
00000048: push.imm.e 617
0000004C: pushenv 0x21E1998
00000050: push.imm.e 0
00000054: conv.i.v
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.v menoo
00000068: call action_if_variable(argc=3)
00000070: pop.v.v local.__b__
00000078: push.local.v local.__b__
00000080: conv.v.b
00000084: bf 0x21E1998
00000088: b 0x21E19A0
0000008C: popenv 0x41E195C
00000090: b 0x21E19A4
00000094: popenv 0x1DE19A0
00000098: push.local.v local.__b__
000000A0: conv.v.b
000000A4: bf 0x21E1A0C
000000A8: push.imm.e -1
000000AC: push.imm.e 0
000000B0: push.v obj0.view_hview[array]
000000B8: push.imm.e -1
000000BC: push.imm.e 0
000000C0: push.v obj0.view_yview[array]
000000C8: add.v.v
000000CC: push.imm.e -1
000000D0: push.imm.e 0
000000D4: push.v obj0.view_xview[array]
000000DC: push.imm.e 284
000000E0: push.global.v global.sca
000000E8: mul.v.i
000000EC: add.v.v
000000F0: call action_move_to(argc=2)
000000F8: popz
000000FC: b 0x21E1A28
00000100: push.imm.e -1000
00000104: conv.i.v
00000108: push.imm.e -1000
0000010C: conv.i.v
00000110: call action_move_to(argc=2)
00000118: popz
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: push.imm.e 0
00000128: conv.i.v
0000012C: push.v over
00000134: call action_if_variable(argc=3)
0000013C: pop.v.v local.__b__
00000144: push.local.v local.__b__
0000014C: conv.v.b
00000150: bf 0x21E1B0C
00000154: push.imm.e 156
00000158: pushenv 0x21E1AA4
0000015C: push.imm.e 0
00000160: conv.i.v
00000164: push.imm.e 11
00000168: conv.i.v
0000016C: push.v selec
00000174: call action_if_variable(argc=3)
0000017C: pop.v.v local.__b__
00000184: push.local.v local.__b__
0000018C: conv.v.b
00000190: bf 0x21E1AA4
00000194: b 0x21E1AAC
00000198: popenv 0x41E1A68
0000019C: b 0x21E1AB0
000001A0: popenv 0x1DE1AAC
000001A4: push.local.v local.__b__
000001AC: conv.v.b
000001B0: bf 0x21E1AE8
000001B4: push.imm.e 1
000001B8: conv.i.v
000001BC: push.imm.e 0
000001C0: conv.i.v
000001C4: push.imm.e 513
000001C8: conv.i.v
000001CC: call action_sprite_set(argc=3)
000001D4: popz
000001D8: b 0x21E1B0C
000001DC: push.imm.e 1
000001E0: conv.i.v
000001E4: push.imm.e 0
000001E8: conv.i.v
000001EC: push.imm.e 511
000001F0: conv.i.v
000001F4: call action_sprite_set(argc=3)
000001FC: popz