// gml_Object_repre_Step_0  locals=2 args=0 len=624
// locals: arguments, __b__
00000000: push.imm.e -1
00000004: push.imm.e 0
00000008: push.v obj0.view_yview[array]
00000010: push.imm.e 20
00000014: add.i.v
00000018: push.imm.e -1
0000001C: push.imm.e 0
00000020: push.v obj0.view_xview[array]
00000028: push.imm.e 520
0000002C: add.i.v
00000030: call action_move_to(argc=2)
00000038: popz
0000003C: push.imm.e 0
00000040: conv.i.v
00000044: push.imm.e 0
00000048: conv.i.v
0000004C: push.imm.e 736
00000050: conv.i.v
00000054: call action_if_number(argc=3)
0000005C: pop.v.v local.__b__
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x21E6160
00000074: push.imm.e 0
00000078: conv.i.v
0000007C: push.imm.e 0
00000080: conv.i.v
00000084: push.imm.e 291
00000088: conv.i.v
0000008C: call action_if_number(argc=3)
00000094: pop.v.v local.__b__
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x21E6160
000000AC: push.imm.e 156
000000B0: pushenv 0x21E60D8
000000B4: push.imm.e 0
000000B8: conv.i.v
000000BC: push.imm.e 0
000000C0: conv.i.v
000000C4: push.v dara
000000CC: call action_if_variable(argc=3)
000000D4: pop.v.v local.__b__
000000DC: push.local.v local.__b__
000000E4: conv.v.b
000000E8: bf 0x21E60D8
000000EC: b 0x21E60E0
000000F0: popenv 0x41E609C
000000F4: b 0x21E60E4
000000F8: popenv 0x1DE60E0
000000FC: push.local.v local.__b__
00000104: conv.v.b
00000108: bf 0x21E6160
0000010C: push.imm.e 156
00000110: pushenv 0x21E6138
00000114: push.imm.e 3
00000118: conv.i.v
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: push.v oil
0000012C: call action_if_variable(argc=3)
00000134: pop.v.v local.__b__
0000013C: push.local.v local.__b__
00000144: conv.v.b
00000148: bf 0x21E6138
0000014C: b 0x21E6140
00000150: popenv 0x41E60FC
00000154: b 0x21E6144
00000158: popenv 0x1DE6140
0000015C: push.local.v local.__b__
00000164: conv.v.b
00000168: bf 0x21E6160
0000016C: call action_kill_object(argc=0)
00000174: popz
00000178: push.imm.e 0
0000017C: conv.i.v
00000180: push.imm.e 0
00000184: conv.i.v
00000188: push.v loan_uno
00000190: call action_if_variable(argc=3)
00000198: pop.v.v local.__b__
000001A0: push.local.v local.__b__
000001A8: conv.v.b
000001AC: bf 0x21E6258
000001B0: push.imm.e 0
000001B4: conv.i.v
000001B8: push.imm.e 0
000001BC: conv.i.v
000001C0: push.v loan_due
000001C8: call action_if_variable(argc=3)
000001D0: pop.v.v local.__b__
000001D8: push.local.v local.__b__
000001E0: conv.v.b
000001E4: bf 0x21E6258
000001E8: push.imm.e 0
000001EC: conv.i.v
000001F0: push.imm.e 0
000001F4: conv.i.v
000001F8: push.v loan_tre
00000200: call action_if_variable(argc=3)
00000208: pop.v.v local.__b__
00000210: push.local.v local.__b__
00000218: conv.v.b
0000021C: bf 0x21E6258
00000220: push.imm.e 0
00000224: conv.i.v
00000228: push.imm.e 0
0000022C: conv.i.v
00000230: push.v loan_quattro
00000238: call action_if_variable(argc=3)
00000240: pop.v.v local.__b__
00000248: push.local.v local.__b__
00000250: conv.v.b
00000254: bf 0x21E6258
00000258: push.imm.e 132
0000025C: pushenv 0x21E6254
00000260: push.imm.e 0
00000264: pop.v.i loaned
0000026C: popenv 0x41E6248