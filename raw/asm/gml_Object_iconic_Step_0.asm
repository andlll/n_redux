// gml_Object_iconic_Step_0  locals=2 args=0 len=676
// locals: arguments, __b__
00000000: push.imm.e -1
00000004: push.imm.e 0
00000008: push.v obj0.view_yview[array]
00000010: push.imm.e 20
00000014: push.global.v global.sca
0000001C: mul.v.i
00000020: add.v.v
00000024: push.global.v global.upp
0000002C: add.v.v
00000030: push.imm.e -1
00000034: push.imm.e 0
00000038: push.v obj0.view_xview[array]
00000040: call action_move_to(argc=2)
00000048: popz
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.v easy
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x21EB608
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.v over
0000009C: call action_if_variable(argc=3)
000000A4: pop.v.v local.__b__
000000AC: push.local.v local.__b__
000000B4: conv.v.b
000000B8: bf 0x21EB608
000000BC: push.imm.e 156
000000C0: pushenv 0x21EB550
000000C4: push.imm.e 3
000000C8: conv.i.v
000000CC: push.imm.e 0
000000D0: conv.i.v
000000D4: push.v oil
000000DC: call action_if_variable(argc=3)
000000E4: pop.v.v local.__b__
000000EC: push.local.v local.__b__
000000F4: conv.v.b
000000F8: bf 0x21EB550
000000FC: b 0x21EB558
00000100: popenv 0x41EB514
00000104: b 0x21EB55C
00000108: popenv 0x1DEB558
0000010C: push.local.v local.__b__
00000114: conv.v.b
00000118: bf 0x21EB608
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: push.imm.e 0
00000128: conv.i.v
0000012C: push.v de
00000134: call action_if_variable(argc=3)
0000013C: pop.v.v local.__b__
00000144: push.local.v local.__b__
0000014C: conv.v.b
00000150: bf 0x21EB608
00000154: push.imm.e 142
00000158: pushenv 0x21EB5B8
0000015C: push.imm.e 0
00000160: pop.v.i goer
00000168: popenv 0x41EB5AC
0000016C: push.imm.e 1
00000170: conv.i.v
00000174: push.imm.e 0
00000178: conv.i.v
0000017C: push.imm.e 518
00000180: conv.i.v
00000184: call action_sprite_set(argc=3)
0000018C: popz
00000190: push.imm.e 1
00000194: conv.i.v
00000198: push.imm.e 300
0000019C: conv.i.v
000001A0: call action_set_alarm(argc=2)
000001A8: popz
000001AC: push.imm.e 1
000001B0: pop.v.i de
000001B8: push.imm.e 154
000001BC: pushenv 0x21EB64C
000001C0: push.imm.e 0
000001C4: conv.i.v
000001C8: push.imm.e 0
000001CC: conv.i.v
000001D0: push.v life
000001D8: call action_if_variable(argc=3)
000001E0: pop.v.v local.__b__
000001E8: push.local.v local.__b__
000001F0: conv.v.b
000001F4: bf 0x21EB64C
000001F8: b 0x21EB654
000001FC: popenv 0x41EB610
00000200: b 0x21EB658
00000204: popenv 0x1DEB654
00000208: push.local.v local.__b__
00000210: conv.v.b
00000214: bf 0x21EB6C8
00000218: push.imm.e 0
0000021C: conv.i.v
00000220: push.imm.e 0
00000224: conv.i.v
00000228: push.v over
00000230: call action_if_variable(argc=3)
00000238: pop.v.v local.__b__
00000240: push.local.v local.__b__
00000248: conv.v.b
0000024C: bf 0x21EB6C8
00000250: push.imm.e 1
00000254: pop.v.i over
0000025C: push.imm.e 2
00000260: conv.i.v
00000264: push.imm.e 900
00000268: conv.i.v
0000026C: call action_set_alarm(argc=2)
00000274: popz
00000278: push.imm.e 0
0000027C: conv.i.v
00000280: push.imm.e 0
00000284: conv.i.v
00000288: push.global.v global.sca
00000290: push.global.v global.sca
00000298: call action_sprite_transform(argc=4)
000002A0: popz