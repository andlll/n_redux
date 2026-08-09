// gml_Object_tutorial_square_Step_0  locals=2 args=0 len=940
// locals: arguments, __b__
00000000: call window_get_width(argc=0)
00000008: pop.v.v proto1
00000010: call window_get_height(argc=0)
00000018: pop.v.v proto2
00000020: push.builtin.v os_type
00000028: push.imm.e 4
0000002C: cmp.i.v ==
00000030: bf 0x209C46C
00000034: push.v proto1
0000003C: push.v proto2
00000044: cmp.v.v >
00000048: bf 0x209C460
0000004C: push.imm.e 0
00000050: pop.v.i went
00000058: b 0x209C46C
0000005C: push.imm.e 100
00000060: pop.v.i went
00000068: push.builtin.v os_type
00000070: push.imm.e 0
00000074: cmp.i.v ==
00000078: bf 0x209C48C
0000007C: push.imm.e 0
00000080: pop.v.i went
00000088: push.v phase
00000090: push.imm.e 5
00000094: cmp.i.v ==
00000098: bf 0x209C4C8
0000009C: push.imm.e 267
000000A0: conv.i.v
000000A4: call instance_number(argc=1)
000000AC: push.imm.e 0
000000B0: cmp.i.v ==
000000B4: bf 0x209C4C8
000000B8: push.imm.e 6
000000BC: pop.v.i phase
000000C4: push.v phase
000000CC: push.imm.e 9
000000D0: cmp.i.v ==
000000D4: bf 0x209C504
000000D8: push.imm.e 187
000000DC: conv.i.v
000000E0: call instance_number(argc=1)
000000E8: push.imm.e 5
000000EC: cmp.i.v >=
000000F0: bf 0x209C504
000000F4: push.imm.e 10
000000F8: pop.v.i phase
00000100: push.v phase
00000108: push.imm.e 12
0000010C: cmp.i.v ==
00000110: bf 0x209C544
00000114: push.imm.e 201
00000118: conv.i.v
0000011C: call instance_number(argc=1)
00000124: push.v tutind
0000012C: cmp.v.v >
00000130: bf 0x209C544
00000134: push.imm.e 13
00000138: pop.v.i phase
00000140: push.v phase
00000148: push.imm.e 16
0000014C: cmp.i.v ==
00000150: bf 0x209C584
00000154: push.imm.e 189
00000158: conv.i.v
0000015C: call instance_number(argc=1)
00000164: push.v tutpar
0000016C: cmp.v.v >
00000170: bf 0x209C584
00000174: push.imm.e 17
00000178: pop.v.i phase
00000180: push.v phase
00000188: push.imm.e 19
0000018C: cmp.i.v ==
00000190: bf 0x209C5C4
00000194: push.imm.e 207
00000198: conv.i.v
0000019C: call instance_number(argc=1)
000001A4: push.v tutrl
000001AC: cmp.v.v >
000001B0: bf 0x209C5C4
000001B4: push.imm.e 20
000001B8: pop.v.i phase
000001C0: push.imm.e 0
000001C4: conv.i.v
000001C8: push.imm.e 2
000001CC: conv.i.v
000001D0: push.v phase
000001D8: call action_if_variable(argc=3)
000001E0: pop.v.v local.__b__
000001E8: push.local.v local.__b__
000001F0: conv.v.b
000001F4: bf 0x209C668
000001F8: push.imm.e 156
000001FC: pushenv 0x209C640
00000200: push.imm.e 0
00000204: conv.i.v
00000208: push.imm.e 11
0000020C: conv.i.v
00000210: push.v selec
00000218: call action_if_variable(argc=3)
00000220: pop.v.v local.__b__
00000228: push.local.v local.__b__
00000230: conv.v.b
00000234: bf 0x209C640
00000238: b 0x209C648
0000023C: popenv 0x409C604
00000240: b 0x209C64C
00000244: popenv 0x1C9C648
00000248: push.local.v local.__b__
00000250: conv.v.b
00000254: bf 0x209C668
00000258: push.imm.e 3
0000025C: pop.v.i phase
00000264: push.imm.e 0
00000268: conv.i.v
0000026C: push.imm.e 7
00000270: conv.i.v
00000274: push.v phase
0000027C: call action_if_variable(argc=3)
00000284: pop.v.v local.__b__
0000028C: push.local.v local.__b__
00000294: conv.v.b
00000298: bf 0x209C70C
0000029C: push.imm.e 156
000002A0: pushenv 0x209C6E4
000002A4: push.imm.e 0
000002A8: conv.i.v
000002AC: push.imm.e 0
000002B0: conv.i.v
000002B4: push.v selec
000002BC: call action_if_variable(argc=3)
000002C4: pop.v.v local.__b__
000002CC: push.local.v local.__b__
000002D4: conv.v.b
000002D8: bf 0x209C6E4
000002DC: b 0x209C6EC
000002E0: popenv 0x409C6A8
000002E4: b 0x209C6F0
000002E8: popenv 0x1C9C6EC
000002EC: push.local.v local.__b__
000002F4: conv.v.b
000002F8: bf 0x209C70C
000002FC: push.imm.e 8
00000300: pop.v.i phase
00000308: push.imm.e 0
0000030C: conv.i.v
00000310: push.imm.e 8
00000314: conv.i.v
00000318: push.v phase
00000320: call action_if_variable(argc=3)
00000328: pop.v.v local.__b__
00000330: push.local.v local.__b__
00000338: conv.v.b
0000033C: bf 0x209C7B0
00000340: push.imm.e 156
00000344: pushenv 0x209C788
00000348: push.imm.e 0
0000034C: conv.i.v
00000350: push.imm.e 1
00000354: conv.i.v
00000358: push.v selec
00000360: call action_if_variable(argc=3)
00000368: pop.v.v local.__b__
00000370: push.local.v local.__b__
00000378: conv.v.b
0000037C: bf 0x209C788
00000380: b 0x209C790
00000384: popenv 0x409C74C
00000388: b 0x209C794
0000038C: popenv 0x1C9C790
00000390: push.local.v local.__b__
00000398: conv.v.b
0000039C: bf 0x209C7B0
000003A0: push.imm.e 9
000003A4: pop.v.i phase